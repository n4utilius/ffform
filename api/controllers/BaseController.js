/**
 * BaseController
 *
 * @description :: Server-side logic for managing bases
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `BaseController.index()`
   */
  index: function (req, res) {
    return res.json({
      status:"ok",
      status_code: 200,
      message:"API v1",
    });
  }

};

