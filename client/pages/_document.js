import Document, { Html, Head, Main, NextScript } from "next/document";
import React, { useEffect } from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <div id="modal" />
        <div id="alert" />
        <div id="tooltip" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
