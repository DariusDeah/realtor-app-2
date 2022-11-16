import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <div id="modal" />
        <body>
          <Main />
          <div id="alert" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
