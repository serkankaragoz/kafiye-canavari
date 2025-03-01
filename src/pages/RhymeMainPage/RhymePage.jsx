import { Autocomplete, TextField, AutocompleteRenderGroupParams } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useEffect, useState } from "react";


const rhymeFileName = "rhyme_words.txt";


const options = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

const VirtualizedList = (props) => {
  return (
    <FixedSizeList height={200} width="100%" itemSize={36} itemCount={props.children.length}>
      {({ index, style }) => (
        <div style={style}>{props.children[index]}</div>
      )}
    </FixedSizeList>
  );
};


function RhymePage() {

    const [words, setWords] = useState([]);
    

  useEffect(() => {
    fetch(`http://localhost:3000/kafiye-canavari/${rhymeFileName}`)
      .then((response) => response.text())
      .then((text) => {
        const linesArray = text.split(/\r?\n/)
        //.map(i => {return {label: i, year: 2002}});
        setWords(linesArray);
      })
      .catch((error) => console.error("Error reading file:", error));
  }, []);




  return (
    <div>
        <Autocomplete
          disablePortal
          options={words}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          renderGroup={(params) => <VirtualizedList {...params} />}
        />
    </div>
  )
}

export default RhymePage

/*

        <Autocomplete
          options={["Apple", "Banana", "Cherry"]}
          renderInput={(params) => <TextField {...params} label="Select a fruit" />}
        />

*/