import { useRouter } from "next/router";

export default {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s - RTE",
      };
    } else {
      return {
        titleTemplate: "Rich Text Editor",
      };
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="rich-text-editor" />
      <meta property="og:description" content="A React WYSIWYG editor" />
    </>
  ),
  logo: <span>RichTextEditor</span>,
  project: {
    link: "https://github.com/poetry-galore/rich-text-editor",
  },
  docsRepositoryBase:
    "https://github.com/poetry-galore/rich-text-editor/tree/main/apps/docs",
  sidebar: {
    autoCollapse: true,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  footer: {
    text: (
      <div className="nx-flex nx-flex-col">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/poetry-galore/rich-text-editor"
            target="_blank"
            className="nx-underline"
          >
            Poetry Galore
          </a>
          .
        </p>
        <p>
          Built with{" "}
          <a
            href="https://nextra.site"
            target="_blank"
            className="nx-underline"
          >
            Nextra
          </a>
          .
        </p>
      </div>
    ),
  },
};
