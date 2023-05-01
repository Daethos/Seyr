interface Props {
    spaceCount: number;
};

const NewLine = ({ spaceCount }: Props) => {
  return (
    <>
    { Array.from({ length: spaceCount }, (item, index) => {
      return <br key={index} />
    })}
    </>
  );
};

export default NewLine;