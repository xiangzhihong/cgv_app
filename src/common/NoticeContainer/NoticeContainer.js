import React, {useContext} from 'react'
import NoticeView from "../NoticeView/NoticeView";

const NoticeContainer = ({thatCd, notices, ...props}) => {
    return (
        notices === undefined ? null :
            <NoticeView
                notices={notices}
                direction="down"
                {...props}
            />
    )
}

export default NoticeContainer
