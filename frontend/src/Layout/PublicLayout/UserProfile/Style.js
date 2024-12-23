import styled from 'styled-components';


export const BannerSection3 = styled.section`
background-image: url('https://res.cloudinary.com/dgff7kkuu/image/upload/v1734868733/userProfile_p3lcbs.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 55vh;
display: flex;
align-items: center;
position: relative;
z-index: 1;
user-select: none;
outline: none;

`;

export const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
    user-select: none;
    outline: none;
`;

export const UserProfileLeft = styled.div`
    width: 30%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const UserProfileRight = styled.div`
    width: 70%;
    margin-left: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled.img`
    width:150px;
    height:150px;
    border-radius: 50%;
    border: 2px solid silver;
    box-shadow: 0 4px 8px yellow;
    cursor: pointer;
`;

export const ProfileInfo = styled.div`
    margin-top: 40px;
    margin-left: 20px;
    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }
    p {
        font-size: 16px;
        color: #555;
    }
`;

export const SectionTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 1px solid silver;
    font-weight: bold;
`;

export const TravelHistory = styled.div`
    margin-bottom: 20px;
`;

export const FavoriteDestinations = styled.div`
    margin-bottom: 20px;
`;

export const TravelPackage = styled.div`
    margin-bottom: 20px;
`;

export const ProfileRole = styled.div`
    border-radius: 10px;
    padding: 2px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    text-align: center; 
    justify-content: center;
    height:52px;
    
`;


export const ProfileContainer = styled.div`
    padding: 11px;
    display: flex;
    border-bottom: 1px solid silver;
`;


