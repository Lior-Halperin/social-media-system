import express,{Request,Response,NextFunction} from 'express'
// import logic from '../5-logic/cities-logic'
const router = express.Router()

// http://localhost:3002/api/cities/israel
router.get("/streets/:city/:street", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {country, street} = request.params;
        // const streets = await logic.getStreetsByCountry(country, street)
        // response.json(streets);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;