/**
 * @author : Alaa Ayaad
 * @description : This file contains the routes for authentication
 * @date : 28/09/2024
 *
 * @param {Object} express - The Express module used to create the server.
 * @param {Object} router - The Express router to define the routes.
 * @param {Function} register - Controller function to handle series crad Operations.
 * @param {Function} getAll - Controller function to handle get request of series.
 */

/**Get all series**/
const getAll = async (req, res) => {
  let series = await req.body;
  res.status(200).json(series);
};

module.exports(getAll);
