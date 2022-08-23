import React from "react";
import { Component } from "react";

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight,
    IHighlight,
    NewHighlight,
} from "./react-pdf-highlighter";

import { Spinner } from "./Spinner";

import "./style/App.css";

const testHighlights: Record<string, Array<IHighlight>> = {};

interface State {
    url: string;
    highlights: Array<IHighlight>;
    isRedactionComplete: boolean;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);

const resetHash = () => {
    document.location.hash = "";
};

const HighlightPopup = ({
    comment,
    onClick,
}: {
    comment: { text: string; emoji: string };
    onClick: () => void;
}) => (
    //true ? (
    // <div className="Highlight__popup">
    //   {comment.emoji} {comment.text}
    // </div>
    <div className="Tip">
        <div className="Tip__compact Tip__compact-unredact" onClick={onClick}>
            Remove redaction
        </div>
    </div>
);
//) : null;

//const PRIMARY_PDF_URL = "response2.pdf";
// const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";
const PRIMARY_PDF_URL =
    document?.getElementById("pdf-root")?.getAttribute("data-pdf-url") || "";
//"https://sarumpolespike.blob.core.windows.net/rumpole/123/pdfs/101.pdf?sv=2020-08-04&se=2024-02-14T11%3A37%3A19Z&sr=b&sp=r&rsct=application%2Fpdf&sig=v5zNZ%2BJNkib7HT5%2BK2cTbS%2B%2FlnYkcfmNU3Qj5ZiBHrc%3D";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class App extends Component<{}, State> {
    private containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);
        this.containerRef = React.createRef();
    }

    state = {
        url: initialUrl,
        highlights: testHighlights[initialUrl]
            ? [...testHighlights[initialUrl]]
            : [],
        isRedactionComplete: false,
    };

    resetHighlights = () => {
        this.setState({
            highlights: [],
        });
    };

    setRedactionComplete = () => {
        this.setState({ isRedactionComplete: true });
    };

    // toggleDocument = () => {
    //   const newUrl =
    //     this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    //   this.setState({
    //     url: newUrl,
    //     highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    //   });
    // };

    scrollViewerTo = (highlight: any) => {};

    scrollToHighlightFromHash = () => {
        const highlight = this.getHighlightById(parseIdFromHash());

        if (highlight) {
            this.scrollViewerTo(highlight);
        }
    };

    componentDidMount() {
        window.addEventListener(
            "hashchange",
            this.scrollToHighlightFromHash,
            false
        );
    }

    getHighlightById(id: string) {
        const { highlights } = this.state;

        return highlights.find((highlight) => highlight.id === id);
    }

    addHighlight(highlight: NewHighlight) {
        const { highlights } = this.state;

        console.log("Saving highlight", highlight);

        this.setState({
            highlights: [{ ...highlight, id: getNextId() }, ...highlights],
        });
    }

    updateHighlight(highlightId: string, position: Object, content: Object) {
        console.log("Updating highlight", highlightId, position, content);

        this.setState({
            highlights: this.state.highlights.map((h) => {
                const {
                    id,
                    position: originalPosition,
                    content: originalContent,
                    ...rest
                } = h;
                return id === highlightId
                    ? {
                          id,
                          position: { ...originalPosition, ...position },
                          content: { ...originalContent, ...content },
                          ...rest,
                      }
                    : h;
            }),
        });
    }

    removeHighlight = (id: string) => {
        this.setState({
            highlights: this.state.highlights.filter((item) => item.id !== id),
        });
    };

    render() {
        const { url, highlights, isRedactionComplete } = this.state;

        return (
            <>
                {highlights.length && !isRedactionComplete && (
                    <div
                        className="redaction-footer"
                        style={{
                            width:
                                (this.containerRef.current?.clientWidth ?? 0) -
                                2,
                        }}
                    >
                        <span className="removeRedactions looks-like-a-link-underline">
                            Remove all redactions
                        </span>
                        <span>
                            {highlights.length === 1
                                ? "There is 1 redaction"
                                : `There are ${highlights.length} redactions`}
                        </span>

                        <button
                            className="govuk-button saveAndFinishButton"
                            onClick={() => this.setRedactionComplete()}
                        >
                            Save all redactions
                        </button>
                    </div>
                )}
                <div
                    ref={this.containerRef}
                    style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <PdfLoader url={url} beforeLoad={<Spinner />}>
                        {(pdfDocument) => (
                            <PdfHighlighter
                                pdfDocument={pdfDocument}
                                enableAreaSelection={(event) => {
                                    return (
                                        (event.target as HTMLElement)
                                            .className === "textLayer"
                                    ); //event.altKey;
                                }}
                                onScrollChange={resetHash}
                                pdfScaleValue="page-width"
                                scrollRef={(scrollTo) => {
                                    this.scrollViewerTo = scrollTo;

                                    this.scrollToHighlightFromHash();
                                }}
                                onSelectionFinished={(
                                    position,
                                    content,
                                    hideTipAndSelection,
                                    transformSelection
                                ) => (
                                    <Tip
                                        onOpen={transformSelection}
                                        onConfirm={(comment) => {
                                            this.addHighlight({
                                                content,
                                                position,
                                                comment,
                                            });

                                            hideTipAndSelection();
                                        }}
                                    />
                                )}
                                highlightTransform={(
                                    highlight,
                                    index,
                                    setTip,
                                    hideTip,
                                    viewportToScaled,
                                    screenshot,
                                    isScrolledTo
                                ) => {
                                    const isTextHighlight = !Boolean(
                                        highlight.content &&
                                            highlight.content.image
                                    );

                                    const component = isTextHighlight ? (
                                        <Highlight
                                            isScrolledTo={isScrolledTo}
                                            position={highlight.position}
                                            comment={highlight.comment}
                                        />
                                    ) : (
                                        <AreaHighlight
                                            isScrolledTo={isScrolledTo}
                                            highlight={highlight}
                                            onChange={(boundingRect) => {
                                                this.updateHighlight(
                                                    highlight.id,
                                                    {
                                                        boundingRect:
                                                            viewportToScaled(
                                                                boundingRect
                                                            ),
                                                    },
                                                    {
                                                        image: screenshot(
                                                            boundingRect
                                                        ),
                                                    }
                                                );
                                            }}
                                        />
                                    );

                                    return (
                                        <Popup
                                            popupContent={
                                                <HighlightPopup
                                                    {...highlight}
                                                    onClick={() => {
                                                        this.removeHighlight(
                                                            highlight.id
                                                        );
                                                        hideTip();
                                                    }}
                                                />
                                            }
                                            onMouseOver={(popupContent) =>
                                                setTip(
                                                    highlight,
                                                    (highlight) => popupContent
                                                )
                                            }
                                            onMouseOut={hideTip}
                                            key={index}
                                            children={component}
                                        />
                                    );
                                }}
                                highlights={highlights}
                            />
                        )}
                    </PdfLoader>
                </div>
            </>
        );
    }
}

export default App;
