import express,{Request,Response,NextFunction} from 'express'
import logic from '../5-logic/streets-logic'
import StreetsModel from '../4-models/streets-model';
const router = express.Router()

// http://localhost:3002/api/streets/israel/Eilat   
router.get("/streets/:country/:city", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {country, city} = request.params;
        const street = new StreetsModel(country,city)
        const streets = await logic.getStreetsByCity(street)
        response.json(streets);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;