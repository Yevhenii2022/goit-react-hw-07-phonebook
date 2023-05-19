import styled from '@emotion/styled';
import { ErrorMessage } from 'formik';

export const MyErrorMsg = styled(ErrorMessage)`
  position: absolute;
  left: 0;
  bottom: -30px;
  color: red;
`;

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
`;
