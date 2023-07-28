import { ColorRing } from 'react-loader-spinner';
import { styled } from 'styled-components';

const StyledDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Loader = ({ visible }) => {
  return (
    <StyledDiv>
      <ColorRing
        wrapperClassName="spinner"
        visible={visible}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </StyledDiv>
  );
};

export default Loader;
