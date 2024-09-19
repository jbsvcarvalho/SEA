import React from 'react';
import { Card } from 'antd';

import userIcon from '../assets/svg/user.svg'

const CardDefault = () => {

    return (
        <>
            <Card style={{ width: 500 }}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu, venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce quam sem, tempus nec justo eget, luctus scelerisque velit. Nam sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate tempus.</p>
                <img src={userIcon} alt='user' />
            </Card>
        </>

    )
}

export default CardDefault