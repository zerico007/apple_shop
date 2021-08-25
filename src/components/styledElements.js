import styled from "@emotion/styled";

const FormDiv = styled.div`
  top: 150px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background: white;
  width: 300px;
  border: none;
  border-radius: 0.3rem;
  padding: 20px;
`;

const Input = styled.input`
  height: 1.5em;
  width: 250px;
  border-bottom: 2px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 16px;
  border-top: none;
  border-left: none;
  border-right: none;
`;

const Button = styled.button`
  height: 2.5em;
  font-size: 16px;
  width: 100px;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  color: #f4f3ea;
  background-color: #333d51;
  transition: all 0.3s;
  &:hover {
    background-color: #e6e600;
    color: #212a31;
    transform: scale(1.1);
    border: solid 1px #333d51;
  }
  outline: none;
  cursor: pointer;
  &:active {
    transform: translateY(4px);
  }
  border-radius: 0.4rem;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  border: none;
`;

const PasswordChecks = styled.div`
  width: 320px;
  height: 170px;
  display: flex;
  flex-direction: column;
  row-gap: 0.7rem;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: linear-gradient(0.25turn, #cbd0d8, #f4f3ea);
  border: none;
  border-radius: 4px;
`;

const Check = styled.div`
  height: 1.5rem;
  width: fit-content;
  padding: 3px;
  display: flex;
  flex-direction: row;
`;

const toastConfig = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export { FormDiv, Button, Input, toastConfig, PasswordChecks, Check };
