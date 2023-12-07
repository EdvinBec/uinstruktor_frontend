type Props = {
  username: string;
};

const Greeting = ({ username }: Props) => {
  return (
    <div className="mt-2 mb-6">
      <h1 className="ml-4 text-2xl font-bold">
        Hello <span className="capitalize">{username}!</span>
      </h1>
      <h1 className="ml-4 font-medium text-sm">
        Embark on a Journey with UInstruktor: Discover Tailored Exercises Just
        for You!
      </h1>
    </div>
  );
};

export default Greeting;
