import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
import { Fragment } from "react";

Font.register({
  family: "Pacifico",
  src: "/Pacifico-Regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

const Header = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <Text>Col 1</Text>
      </View>

      <View style={{ flexGrow: 1 }}>
        <Text>Col 2</Text>
      </View>
    </View>
  );
};

const data = Array.from({ length: 200 }).map((_, i) => ({
  col1: "Test",
  col2: i,
}));

const withTable = () => {
  return (
    <Document title="Table-Pdf">
      <Page style={{ padding: 40, paddingVertical: 70, paddingTop: 100 }}>
        <Text
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
          style={{
            textAlign: "right",
            position: "absolute",
            right: 0,
            top: 2,
            padding: 10,
          }}
        />
        <Text style={{ fontWeight: "extrabold" }}>Table</Text>

        <Header />
        <View style={{}}>
          {data.map((r, i) => (
            <Fragment key={r.col2}>
              <View
                wrap={false}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 4,
                  border: 1,
                }}
              >
                <View
                  style={{
                    flexGrow: 1,
                    fontFamily: "Pacifico",
                  }}
                >
                  <Text>{r.col1}</Text>
                </View>

                <View style={{ flexGrow: 1 }}>
                  <Text>{r.col2 + 1}</Text>
                </View>
              </View>
            </Fragment>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default withTable;
