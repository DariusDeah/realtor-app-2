import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
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
