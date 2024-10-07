import React, { useEffect, useState } from 'react'
import ServiceList from '../Service/ServiceList'
import axios from '../Configuration/AxiosConfig'
import styled from 'styled-components';
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: auto;
  box-shadow: 0 0 10px 0 rgba(224, 234, 40, 0.995);
`;

const SearchInput = styled.input`
  border: none;
  margin-left: 10px;
  outline: none;
  width: 300px;
  border-left: 1px solid #ccc;
  padding-left: 13px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  margin: 0 5px;
  user-select: none;
  padding: 10px;
  color: black;
  border-radius: 10px;
  width: 45px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckmarkContainer = styled.span`
  padding: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px; 
  height: 20px; 
  border: 1px solid #f8b600;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? '#f8b600' : 'transparent')};
`;

export const NavMenuItem = styled.li`
  position: relative;
  list-style: none;
  margin-right: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover > ul {
    display: block;
  }
`;

export const NavMenuLink = styled.a`
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: flex;
  align-items: center;

  &:hover {
    color: #f8b600;
  }
`;

const Services = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedServiceType, setselectedServiceType] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchServiceType = async () => {
      const response = await axios.get('/serviceTypes');
      setServiceTypes(response.result);
      setselectedServiceType(response.result);
    };
    fetchServiceType();
  }, []);

  const handleSearch = (keyword) => {
    setSearch(keyword);
  };

  const handleSelectCategory = (serviceType) => {
    if (serviceType === 'Tất cả danh mục') {
      setselectedServiceType(serviceTypes);
    } else {
      setselectedServiceType((prevSelected) => {
        if (prevSelected.includes(serviceType)) {
          // Prevent deselecting if it's the last selected item
          if (prevSelected.length > 1) {
            return prevSelected.filter((item) => item !== serviceType);
          }
          return prevSelected;
        } else {
          return [...prevSelected, serviceType];
        }
      });
    }
  };


  return (
    <>
      <section style={{ paddingBottom: '40px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 0', userSelect: 'none' }}>
            <Item>
              <NavMenuItem
                className="nav-item dropdown"
                onMouseEnter={() => setActiveDropdown('danh mục')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavMenuLink
                  className="nav-link dropdown-toggle"
                  id="blogDropdown"
                  role="button"
                  aria-expanded={activeDropdown === 'danh mục'}
                >
                  Danh mục
                </NavMenuLink>
                <ul className={`dropdown-menu ${activeDropdown === 'danh mục' ? 'show' : ''}`} aria-labelledby="blogDropdown" style={{ listStyle: 'none', padding: 0 }}>
                  <li>
                    <NavMenuLink
                      style={{ color: 'black' }}
                      className="dropdown-item"
                      onClick={() => handleSelectCategory('Tất cả danh mục')}
                    >
                      <CheckmarkContainer selected={selectedServiceType.length === serviceTypes.length}>
                        {selectedServiceType.length === serviceTypes.length && '✔️'}
                      </CheckmarkContainer>
                      Tất cả danh mục
                    </NavMenuLink>
                  </li>
                  {serviceTypes.map((serviceType) => (
                    <li key={serviceType.id}>
                      <NavMenuLink
                        style={{ color: 'black' }}
                        className="dropdown-item"
                        onClick={() => handleSelectCategory(serviceType)}
                      >
                        <CheckmarkContainer selected={selectedServiceType.includes(serviceType)}>
                          {selectedServiceType.includes(serviceType) && '✔️'}
                        </CheckmarkContainer>
                        {serviceType.name}
                      </NavMenuLink>
                    </li>
                  ))}
                </ul>
              </NavMenuItem>
              <SearchInput type="text" placeholder="Tìm kiếm" onChange={_.debounce((e) => handleSearch(e.target.value), 700)} />
              <SearchIcon />
            </Item>
          </div>
          <ServiceList serviceTypeId={selectedServiceType.length === serviceTypes.length
            ? null : selectedServiceType.map(type => type.id).join(',')} search={search} />
        </div>
      </section>
    </>
  )
}

export default Services