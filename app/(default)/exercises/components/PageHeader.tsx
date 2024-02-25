type Props = {
  title: string;
  descritpion: string;
};

const PageHeader = ({ title, descritpion }: Props) => {
  return (
    <>
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="my-4 md:w-3/4 font-normal">{descritpion}</p>
    </>
  );
};

export default PageHeader;
