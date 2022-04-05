import React, { useState, useCallback } from "react";
import "./TextArea.css";
import debounce from "lodash.debounce";
import axios from "axios";
const API_KEY = "jaH1GV0R1Ax2Cb4b";
var testdata = {
  result: true,
  errors: [
    {
      id: "e1036948609",
      offset: 0,
      length: 5,
      description: {
        en: "Possible spelling mistake found.",
      },
      bad: "Mothr",
      better: ["Mother", "Motor", "Moth", "Moths", "Mot hr"],
      type: "spelling",
    },
    {
      id: "e923913148",
      offset: 11,
      length: 5,
      description: {
        en: "Possible spelling mistake found.",
      },
      bad: "doctr",
      better: ["doctor", "Doctor", "do ctr", "doc tr"],
      type: "spelling",
    },
  ],
};

export default function TextArea() {
  const [value, setValue] = useState("Mothr is a doctr");
  const [data, setData] = useState();

  const changeHandler = (event) => {
    // setValue(event.target.value);
    setValue("Mothr is a doctr");
    const payload = {
      key: "jaH1GV0R1Ax2Cb4b",
      text: event.target.value,
      language: "en-US",
    };

    const headers = {
      Authorization: "Basic jaH1GV0R1Ax2Cb4b",
    };

    axios
      .post(
        `https://api.textgears.com/spelling`,
        { payload }
        // {
        //   headers,
        // }
      )
      .then((res) => {
        // const data = res.data;
        setData(testdata);
        testdata.errors.forEach((word) => {
          if (value.includes(word.bad)) {
            applyCSSChanges(word.bad, value);
          }
        });
      });
  };

  const applyCSSChanges = (badword, value) => {};

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 500), []);

  return (
    <div>
      <textarea
        className="txtarea"
        name="body"
        rows={10}
        columns={50}
        onChange={debouncedChangeHandler}
        placeholder="Type a query..."
        value={value}
      />
      {value}
    </div>
  );
}
