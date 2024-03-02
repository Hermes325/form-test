import "./FormBar.css";
import DB from "./DB";
import { useState } from "react";

const filterResult1 = DB.routes1.filter((_, index) => index < 3);
const filterResult2 = DB.routes1.filter((_, index) => index > 2 && index < 6);

export default function FormBar() {
  function simpleInput(title, type, placeholder) {
    return (
      <div key={title}>
        <label>
          {title} <span className="text-red-500 px-1">*</span>{" "}
        </label>
        <div className="w-[400px]">
          <input
            type={type}
            className=" px-1 h-10 w-[400px] border-amber-300 border-2"
            required
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
  function selectInput(title, options) {
    return (
      <div>
        <label>
          {title} <span className="text-red-500 px-1">*</span>{" "}
        </label>
        <div className="w-[400px]">
          <select className="px-1 h-10 w-[400px] border-amber-300 border-2 selected">
            <option selected disabled hidden></option>
            {options.map((option) => (
              <option className="" value={option.value} key={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  const [checked, setIsChecked] = useState([false, false]);

  return (
    <form
      action=""
      method="get"
      className="high_bar grid grid-rows-12 gap-y-3 mt-8 justify-around "
    >
      {filterResult1.map((route) =>
        simpleInput(route.title, route.type, route.placeholder)
      )}
      {/* должность */}
      {selectInput("Название должности", DB.options)}

      {/* номер телефона */}

      {selectInput("Мобильный телефон", DB.phones)}

      <div>
        <label>
          Мобильный телефон <span className="text-red-500 px-1">*</span>{" "}
        </label>
        <div className="w-[400px] flex ">
          <select className="px-1 h-10 w-[80px] border-amber-300 border-2 selected mr-5">
            <option selected disabled hidden></option>
            {DB.phones.map((option) => (
              <option className="" value={option.value} key={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div>
            <input
              type="number"
              className=" px-1 h-10 w-[300px] border-amber-300 border-2"
              required
            />
          </div>
        </div>
      </div>

      {filterResult2.map((source) =>
        simpleInput(source.title, source.type, source.placeholder)
      )}

      {/* Страна */}
      {selectInput("Страна", DB.countries)}

      {/* Раздел выставки  */}
      {selectInput("Раздел выставки", DB.pathOfExes)}

      {simpleInput("Желаемая площадь стенда (кв. м)", "number", "")}
      <div id="отправить">
        <input
          disabled={checked.some((x) => !x)}
          className="hide mt-4 px-1 h-10 w-[400px] border-amber-300 border-2"
          type="submit"
        />
      </div>
      {DB.checkBox.map((source, i) => (
        <div className="flex">
          <input
            onChange={(e) => {
              setIsChecked((x) => {
                const newArray = [...x];
                newArray[i] = e.target.checked;
                return newArray;
              });
            }}
            checked={checked[i]}
            type={source.type}
            className="submit-button px-1 h-4 w-5 border-amber-300 border-2 mr-1"
          />
          <label className=" block w-[400px] text-xs">{source.title}</label>
        </div>
      ))}
    </form>
  );
}
