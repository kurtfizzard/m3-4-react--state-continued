import React from "react";
import styled from "styled-components";

const Typeahead = ({ categories, suggestions, handleSelect }) => {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );

  // create an array (matches) with the results from filtering the existing array (suggestions)
  const matches = suggestions.filter((suggestion) => {
    // is the length is at least 2 characters
    const isMinLength = value.length >= 2;
    // does the title contains the input (rendered case insensitive)
    const hasInput = suggestion.title
      .toLowerCase()
      .includes(value.toLowerCase());
    return isMinLength && hasInput;
  });

  // create a variable that refers to the currently selected match
  //   const selectedSuggestion = matches[selectedSuggestionIndex];

  //   const displayTypeahead = matches.length > 0;

  return (
    <Container>
      <div>
        <SearchBar
          type="text"
          value={value}
          // on change (character entered in input) change the state
          onChange={(ev) => setValue(ev.target.value)}
          // on enter, arrow up or arrow down, trigger an event
          onKeyDown={(ev) => {
            // create a variable representing selectedSuggestionIndex that we can modify
            let nextSuggestionIndex = selectedSuggestionIndex;
            // create a switch statement allowing the different keys to trigger different events
            switch (ev.key) {
              case "Enter": {
                handleSelect(ev.target.value);
                // return to stop the rest of the switch statement from executing
                return;
              }
              case "ArrowUp": {
                // if the matches index is greater than zero, modify the index (-1)
                if (nextSuggestionIndex > 0) {
                  nextSuggestionIndex = nextSuggestionIndex - 1;
                  //   console.log(nextSuggestionIndex);
                  ev.preventDefault();
                }
                // setSelectedSuggestionIndex to the newly modified index (-1)
                setSelectedSuggestionIndex(nextSuggestionIndex);
                // return to stop the rest of the switch statement from executing
                return;
              }
              case "ArrowDown": {
                // if the matches index is greater than zero and less than the length of the matches array, modify the index (+1)
                if (
                  nextSuggestionIndex >= 0 &&
                  nextSuggestionIndex < matches.length - 1
                ) {
                  nextSuggestionIndex = nextSuggestionIndex + 1;
                  //   console.log(nextSuggestionIndex);
                  ev.preventDefault();
                }
                // setSelectedSuggestionIndex to the newly modified index (+1)
                setSelectedSuggestionIndex(nextSuggestionIndex);
                // return to stop the rest of the switch statement from executing
                return;
              }
            }
          }}
        />
        {/* give the button an on click function that will clear the input (set it's value to an empty string) */}
        <Clear onClick={() => setValue("")}>Clear</Clear>
      </div>
      {/* render an unordered list (empty if there are no matches) */}
      <MatchList>
        {/* map over the matches array and render a list item (book title) for each match */}
        {matches.map((book, index) => {
          // create a variable to represent the index of the input value in the matched title (case insensitive)
          const divider = book.title.toLowerCase().indexOf(value.toLowerCase());
          // create a variable to represent the category name, referenced based on the matched title's categoryId
          const category = categories[book.categoryId].name;
          // create a variable called isSelected and let it evaluate to true if the matched title's index equals selectedSuggestionIndex
          const isSelected = index === selectedSuggestionIndex;

          //   console.log(book, index);
          //   console.log(isSelected);

          return (
            // render a list item for each match
            <MatchTitle
              // give a list item a yellow background when selected
              style={{
                background: isSelected ? "yellow" : "transparent",
              }}
              key={book.id}
              onClick={() => handleSelect(book.title)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
            >
              {/* render the user's input as regular text, everything from the beginning (index 0) to the end of the first occurence of the input value */}
              {book.title.slice(0, divider + value.length)}
              {/* bolden the predicted portion of the title in the match */}
              <Prediction>
                {/* this portion begins at the end of the first occurence of the input value and goes until the end of the string (max index) */}
                {book.title.slice(divider + value.length)}
              </Prediction>
              {/* include the categoryId that the matched book is in, italicized, with the category itself being purple*/}
              <ItalicizedPortion>
                {" "}
                in <PurplePortion>{category}</PurplePortion>
              </ItalicizedPortion>
            </MatchTitle>
          );
        })}
      </MatchList>
    </Container>
  );
};

export default Typeahead;

const SearchBar = styled.input`
  height: 30px;
  width: 300px;

  &:focus {
    border: none;
  }
`;

const Clear = styled.button`
  background: blue;
  border: none;
  border-radius: 5px;
  color: white;
  height: 30px;
  margin-left: 5px;
  width: 60px;
`;

const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 365px;
`;

const MatchList = styled.ul`
  /* list-style-type: square; */
  box-shadow: 2px 2px 2px grey;

  margin-top: 5px;
  /* padding: 5px; */
  width: 100%;
`;

const MatchTitle = styled.li`
  padding: 5px;
  width: 100%;

  /* &:hover {
    background: yellow;
  } */
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const ItalicizedPortion = styled.span`
  font-style: italic;
`;

const PurplePortion = styled.span`
  color: purple;
`;
