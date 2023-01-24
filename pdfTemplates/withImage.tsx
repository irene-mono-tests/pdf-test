import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Image,
} from "@react-pdf/renderer";

const withImage = () => {
  return (
    <Document title="My-image-pdf">
      <Page
        style={{ paddingHorizontal: 40, paddingTop: 40, paddingBottom: 80 }}
      >
        <Text>Image Pdf</Text>

        <Text>Remote Normal Image</Text>
        <Image
          src={
            "https://res.cloudinary.com/dm6nbay0f/image/upload/v1658877130/mountain.jpg"
          }
        />

        <Text>Local Normal Image</Text>
        <Image src={"/carver.jpg"} />

        <Text>Svg images will fail use png or jpg only.</Text>

        <Text>Raw "native" Svg</Text>
        {/* @ts-ignore */}
        <Svg width="190" height="160">
          <Path
            d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
            stroke="rgb(128, 255, 0)"
            strokeWidth={3}
          />
        </Svg>
      </Page>
    </Document>
  );
};

export default withImage;
