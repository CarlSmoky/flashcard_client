import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`

 const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent var(--grey-secondary) var(--grey-secondary) var(--grey-secondary);
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: transparent;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingSpinner = () => {

  return (
    <Container>
      <Loader />
    </Container>
  );


}
export default LoadingSpinner