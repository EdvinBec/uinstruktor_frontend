type Props = {
  title: string;
  descritpion: string;
  classname?: string;
};

const PageHeader = ({ title, descritpion, classname }: Props) => {
  return (
    <div className={classname}>
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="my-4 md:w-3/4 font-normal">{descritpion}</p>
    </div>
  );
};

export default PageHeader;
