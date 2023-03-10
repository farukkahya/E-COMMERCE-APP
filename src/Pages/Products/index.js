import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { error, isLoading } from "react-query";
import Card from "../../Components/Card";

function Products() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLenght: 12,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/products`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const totalPage = Math.ceil(data.length / pagination.dataShowLenght);

  const paginationPage = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const paginationNext = () => {
    if (pagination.currentPage < totalPage) {
      setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
    } else {
      setPagination({ ...pagination, currentPage: totalPage });
    }
  };

  const paginationPrev = () => {
    if (pagination.currentPage > 1) {
      setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
    } else {
      setPagination({ ...pagination, currentPage: 1 });
    }
  };

  const paginationArea = () => {
    const items = [];
    let threePoints = true;
    for (let number = 1; number <= totalPage; number++) {
      if (
        number <= 1 ||
        number >= totalPage ||
        (number >= pagination.currentPage - 1 &&
          number <= pagination.currentPage + 1)
      ) {
        items.push(
          <li
            key={number}
            className={`page-item ${pagination.currentPage === number ? "active" : ""
              }`}
            onClick={() => {
              paginationPage(number);
            }}>
            <a href="#/" className="page-link">{number}</a>
          </li>
        );
      } else {
        if (threePoints === true) {
          items.push(
            <li key={number} className="page-item threePoints">
              <a href="#/" className="page-link">...</a>
            </li>
          );
          threePoints = false;
        }
      }
    }
    return items;
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="product-container">
      <Grid templateColumns='repeat(3, 1fr)' >
        {data
          .slice(
            (pagination.currentPage - 1) * pagination.dataShowLenght,
            pagination.dataShowLenght * pagination.currentPage
          )
          .map((item, index) => {
            return (

              <Card key={index} item={item} className="cardItem"></Card>

            );
          })}
      </Grid>
      <div className="paginationArea">
        <nav aria-label="navigation" className="">
          <ul className="pagination">
            <li className="page-item previous">
              <a href="#/"
                className="page-link"
                onClick={() => {
                  paginationPrev();
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={'2'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-left">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Prev</span>
              </a>
            </li>

            {paginationArea()}

            <li className="page-item next">
              <a href="#/"
                onClick={() => {
                  paginationNext();
                }}
                className="page-link">
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Products;
