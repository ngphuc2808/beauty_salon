export const Heading = (props: ITypes) => {
  return <h1 className="text-white">Hello World, {props.content}</h1>;
};

export const Heading2 = (props: ITypes) => {
  return <h1 className="text-white">Hello World, {props.content}</h1>;
};

export const MyInput = (props: IInput) => {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};
