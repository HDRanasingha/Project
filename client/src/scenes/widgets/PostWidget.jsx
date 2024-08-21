import {
    ChatBubbleOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    Key,
    ShareOutlined,
} from "@mui/icons-material"
import {Box,Divider,IconButton,Typography,useTheme} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { setPosts } from "state";



const PostWidget = ({
    postId,
    postuserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    }) => {
        const [isComments,setIsComments] = useState(false);
        const loggedInUserId = useSelector((state)=>state.user._id);
        const [setPost] = useState([]);
            const dispatch =useDispatch();
           const token = useSelector((state)=> state.token);
           const loggedInUser = useSelector((state)=>state.user._id);
           const isLiked= Boolean(likes[loggedInUserId]);
           const likeCount = Object.keys(likes).length;
            
        
            const {palette} = useTheme();
            const main = palette.neutral.main;
            const primary= palette.primary.main;

            const patchLike = async () => {
                const response = await fetch(
                    `http://localhost:3001/posts/${postId}/like`,
                    {
                        method:"PATCH",
                        headers:{
                            Authorization:`Bearer ${token}`,
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({userId:loggedInUserId}),
                    }
                );
                const updatedPost = await response.json();
                dispatch(setPost({posts:updatedPost}));
            };

            return(
<WidgetWrapper m="1rem 0">
<Friend
friendId={postuserId}
name={name}
subtitle={location}
userPicturePath={userPicturePath}
/>
<Typography color={main} sx={{mt:"1rem"}}>
    {description}
</Typography>
{picturePath && (
    <img
    width="100%"
    height="auto"
    alt="post"
    style={{borderRadius:"0.75rem",marginTop:"0.75rem"}}
    src={`http://localhost:3001/assests/${picturePath}`}
     />
)}
<FlexBetween mt="0.25rem">
<FlexBetween gap="1rem">
    <FlexBetween gap="0.3rem">
        <IconButton onClick={patchLike}>
           {isLiked?(
            <FavoriteOutlined sx={{color:primary}}/>
):(
            <FavoriteBorderOutlined/>
           )}

        </IconButton>
        <Typography>
            {likeCount}
        </Typography>
<FlexBetween gap="0.3rem">
<IconButton onClick={()=> setIsComments(!isComments)}>
<ChatBubbleOutlined/>
</IconButton>
<Typography>
    {comments.length}
</Typography>
</FlexBetween>
    </FlexBetween>

<IconButton>
    <ShareOutlined/>
</IconButton>
</FlexBetween>
{isComments &&(
    <Box mt="0.5rem">
        {comments.map((comment,i)=>(
            <Box key={`${name}-${i}`}>
                <Divider/>
                <Typography sx={{color:main,m:"0.5rem 0",pl:"1rem"}}>
                    {comments}

                </Typography>

            </Box>
        ))}
<Divider/>
    </Box>
)}



</FlexBetween>
</WidgetWrapper>

            )
        
    }

    export default PostWidget;