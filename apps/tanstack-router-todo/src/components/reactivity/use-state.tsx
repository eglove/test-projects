import startsWith from "lodash/startsWith";
import { useState } from "react";

export const UseState = () => {
  const [name, setName] = useState("John Doe");

  return (
    <div>
      <div>
        useState
      </div>
      <div>
        {name}
      </div>
      <button
        onClick={() => {
          if (startsWith(name, "John")) {
            setName("Jane Doe");
          } else {
            setName("John Doe");
          }
        }}
        className="border-2 px-1"
        type="button"
      >
        Change Name
      </button>
      <div>
        Nested value:
        {" "}
        <SimpleWrapper value={name} />
      </div>
    </div>
  );
};

export const SimpleWrapper = ({ value }: Readonly<{ value: string }>) => {
  return <SimpleDisplay value={value} />;
};

export const SimpleDisplay = ({ value }: Readonly<{ value: string }>) => {
  return (
    <div>
      {value}
    </div>
  );
};
