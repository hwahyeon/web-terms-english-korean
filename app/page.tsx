"use client";

import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

export default function Home() {
  const [mdData, setMdData] = useState<string>("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/hwahyeon/terms-english-korean/main/README.md"
    )
      .then((response: Response) => response.text())
      .then((text: string) => {
        const html: string = marked.parse(text);
        setMdData(html);
      })
      .catch((error: Error) =>
        console.error("Error fetching markdown:", error)
      );
  }, []);

  return (
    <main className={styles.main}>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: mdData }}
      ></div>
    </main>
  );
}
