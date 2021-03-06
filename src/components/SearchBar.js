import React from 'react';
import styled from '@emotion/styled';
import { Input } from './styledElements';

function SearchBar({search, updateSearch}) {
    const SearchDiv = styled.div`
        width: 75vw;
        height: 2rem;
        top: 150px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 20px;
        margin-bottom: 20px;
    `;

    return (
        <SearchDiv key={'searching'}>
            <Input style={{width: '100%', border: 'solid 3px #212a31', borderRadius:'0.4rem'}} 
            type="text" 
            name="search" 
            id='searchText' 
            placeholder='Search'
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            autoFocus={true}
            />
            <i style={{float: 'right', position: 'relative', top: '-43px'}} className="fas fa-search"></i>
        </SearchDiv>
    )
}

export default SearchBar;