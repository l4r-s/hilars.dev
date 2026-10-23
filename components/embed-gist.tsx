"use client";

import { useEffect, useState } from 'react';

// Embeds one file of a GitHub gist through gist.github.com's JSONP endpoint.
// It does what react-embed-gist 1.0.22 did. That package bundles its own copy
// of React, which React 19 cannot render (error #525), so it is inlined here.
type GistResponse = { description: string; div: string; stylesheet: string; error?: string };
type GistState = { loading: boolean; error?: string; title?: string; content?: string };

export default function EmbedGist({ gistId, file }: { gistId: `${string}/${string}`, file: string }) {
    const [fetched, setFetched] = useState<GistState>({ loading: true });
    const validFormat = Boolean(gistId.split('/')[1]);
    const state: GistState = validFormat ? fetched : { loading: false, error: `${gistId} is not valid format` };

    useEffect(() => {
        if (!validFormat) return;

        const callback = `gist_callback_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
        (window as unknown as Record<string, (gist: GistResponse) => void>)[callback] = (gist) => {
            if (gist.error) {
                setFetched({ loading: false, error: gist.error });
            } else {
                setFetched({
                    loading: false,
                    title: gist.description,
                    content: gist.div.replace(/href=/g, 'target="_blank" href='),
                });
            }

            // Several embeds share one stylesheet; add it to <head> only once.
            if (document.head.innerHTML.indexOf(gist.stylesheet) === -1) {
                const stylesheet = document.createElement('link');
                stylesheet.type = 'text/css';
                stylesheet.rel = 'stylesheet';
                stylesheet.href = gist.stylesheet;
                document.head.appendChild(stylesheet);
            }
        };

        const script = document.createElement('script');
        let url = `https://gist.github.com/${gistId}.json?callback=${callback}`;
        if (file) url += `&file=${file}`;
        script.type = 'text/javascript';
        script.src = url;
        script.onerror = () => setFetched({ loading: false, error: `${gistId} failed to load` });
        document.head.appendChild(script);
    }, [gistId, file, validFormat]);

    return (
        <div className="gist-container not-prose">
            {state.loading ? (
                <article><p>Loading gist...</p></article>
            ) : state.error ? (
                <article>{state.error}</article>
            ) : (
                <article>
                    <h2>{state.title}</h2>
                    <section dangerouslySetInnerHTML={{ __html: state.content ?? '' }} />
                </article>
            )}
        </div>
    )
}
