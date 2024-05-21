
import prisma from "../library/prisma.js"
import {FloodData} from '../FloodData/Data.js'




export async function insertFloodData(req, res) {
  try {
      for (const data of FloodData) {
          await prisma.floodData.create({
              data: {
                  eventDate: data["Event Date"],
                  imageryDate: data["Imagery Date"],
                  country: data["Country"],
                  state: data["State/Province"],
                  district: data["District"],
                  placeName: data["Place Name"],
                  lat: data["Lat"],
                  long: data["Long"],
                  sensor: data["Data/Sensor"],
                  source: data["Source"],
                  imageLink: data["Image Link"]
              }
          });
      }
      console.log("Flood data inserted successfully.");
      res.status(200).json(data);
  } catch (error) {
      console.error("Error inserting flood data:", error);
  } finally {
      await prisma.$disconnect();
  }
}





export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const data = await prisma.floodData.findMany({
      // Specify which fields you want to include in the response
      // select: {
      //   id  : true,
      //   Id : true,
      //   EventDate  : true,
      //   ImagaryDate : true,
      //   Country      : true,
      //   State : true,
      //   District    : true,
      //   PlaceName    : true,
      //   Lat  : true,
      //   Long : true,
      //   DataSensor  : true,
      //   Source : true,
      //   Link : true,
      // },
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id; // Extract the id from request parameters
    
  try {
    const data = await prisma.floodData.findUnique({
      where: { id }
    });

    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const getPostsByCountry = async (req, res) => {
  const country = req.params.country; // Extract the country from URL parameters

  try {
    const data = await prisma.floodData.findMany({
      where: { country: country } // Filter data based on the country
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts by country" });
  }
};



