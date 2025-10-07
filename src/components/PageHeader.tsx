interface PageHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PageHeader = ({ title, buttonText, onButtonClick }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl mb-3 text-gray-800 font-semibold">{title}</h1>
      <button
        onClick={onButtonClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PageHeader;
