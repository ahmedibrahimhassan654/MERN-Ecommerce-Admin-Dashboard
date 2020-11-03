import Search from 'antd/lib/input/Search'
import React from 'react'

const SearchForm = ({ keyword, setKeyword }) => {
	//step3
	const handleSearchChange = (e) => {
		e.preventDefault()
		setKeyword(e.target.value.toLowerCase())
	}
	return (
		<div className='container pt-4 pb-4'>
			<Search
				placeholder='search by name'
				allowClear
				enterButton='Search'
				size='large'
				onChange={handleSearchChange}
				value={keyword}
			/>
		</div>
	)
}

export default SearchForm
