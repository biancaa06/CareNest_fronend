import CaretakersList from "../components/CartekersPage/CaretakersList";

const CaretakersPage = () => {
    return (
      <div className="page-background page-background-top">
        <div className="content-container">
          <h1 className="text-5xl font-bold text-green-700 mb-10 text-center">Caretakers</h1>
          <div className="mt-10">
            <CaretakersList />
          </div>
        </div>
      </div>
    );
  };
  export default CaretakersPage;
  
  
  
