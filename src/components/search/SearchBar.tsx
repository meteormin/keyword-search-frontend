import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

export interface SearchBarProps {
    id: string;
    data: any[];
    onPaginate?: () => any;
    onChange?: (selected: any[]) => any;
    maxResults: number;
}

const SearchBar = ({
    id,
    data,
    onPaginate,
    onChange,
    maxResults,
}: SearchBarProps) => {
    const [options, setOptions] = useState<any[]>([]);

    useEffect(() => {
        setOptions(data);
    }, [data]);

    return (
        <Typeahead
            id={id}
            options={options}
            onPaginate={onPaginate}
            maxResults={maxResults}
            paginate={true}
            onChange={onChange}
        />
    );
};

export default SearchBar;
