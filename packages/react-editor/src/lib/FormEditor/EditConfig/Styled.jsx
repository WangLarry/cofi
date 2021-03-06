/**
  * Copyright 2020, Gal Havivi
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  > div {
    flex: 1;
    border: 1px solid #e1e1e1;
    .MuiTab-root {
      min-width: unset;
    }
  }
`;

export const EditConfigWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: 1;
`;

export const Blocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  cursor: not-allowed;
`;
