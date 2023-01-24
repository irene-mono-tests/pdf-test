import { Page, Text, View, Document, Font } from "@react-pdf/renderer";

//

Font.register({
  family: "Pacifico",
  src: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
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

const data = Array.from({ length: 700 }).map((_, i) => ({
  col1: "Test",
  col2: i,
}));

const withTable = () => {
  return (
    <Document title="Table-Pdf">
      <Page style={{ padding: 40 }}>
        <Text style={{ fontWeight: "extrabold" }}>Table</Text>

        <Header />
        <View>
          {data.map((r, i) => (
            <View
              key={r.col2}
              wrap={false}
              style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: 1,
                borderBottomWidth: i < data.length - 1 ? 0.5 : 1,
                padding: 4,
                fontFamily: "Pacifico",
              }}
            >
              <View style={{ flexGrow: 1 }}>
                <Text>{r.col1}</Text>
              </View>

              <View style={{ flexGrow: 1 }}>
                <Text>{r.col2 + 1}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default withTable;
