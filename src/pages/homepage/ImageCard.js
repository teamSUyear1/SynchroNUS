import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from "@mui/material/Collapse";

const ImageCard = ({checked}) => {

    return (
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Card sx={{ maxWidth: 600, backgroundColor: 'rgba(0,0,0,0.7)', margin: '20px' }}>
          <CardMedia
            component="img"
            height="440"
            image="/src/components/Assets/download.png"
            alt="SynchoNUS"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1" sx={{
                fontFamily: 'Nunito', fontWeight: 'bold', fontSize:'2rem', color: 'white'
            }}>
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
                fontFamily: 'Nunito', fontSize:'1rem', color: 'white'
            }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        </Collapse>
    )
}

export default ImageCard;