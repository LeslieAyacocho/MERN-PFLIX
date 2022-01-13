import React, { useState } from 'react'
import { useHistory } from 'react-router-dom' 
const Search = () => {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const searchHandler = (e) => {
        if(keyword){
            console.log('no key')
        }
        e.preventDefault()
        if (keyword) {
            if (window.location.pathname === '/movies') {
                    history.push(`/movies/search/${keyword}`)
            }
            if (window.location.pathname === '/actors') {
                    history.push(`/actors/search/${keyword}`)
            }

        } else {
            history.push('/')
        }
    }
    return (
        <form onSubmit={searchHandler} className='search' >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}
export default Search