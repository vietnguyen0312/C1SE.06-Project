import React from 'react'
import { Avatar, Rating, TextField } from '@mui/material'
import { Star } from 'lucide-react'

export class UserRating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: props.rating
        }
    }

    render() {
        return (
            <>
                <Avatar
                    alt="Remy Sharp"
                    src={`/img/user/${this.props.user.avatar}`}
                    sx={{ width: 24, height: 24 }}
                />
            </>
        )
    }
}