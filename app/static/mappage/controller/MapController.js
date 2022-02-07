export default class MapController {
  constructor(mapModel, { mapView }) {
    this.mapModel = mapModel;
    this.mapView = mapView;

    this.renderMapData();

  }

  renderMapData() {
    this.mapView.renderMap();
    this.mapView.refreshMyLoaction();
  }

  // async getWalkCourse() {
  //   this.walkCourseList = await this.mapModel.setWalkCourse();
  //   this.renderWalkCourse();
  // }

  // renderWalkCourse() {
  //   this.mapView.showBannerInfo(this.walkCourseList.points);
  //   this.mapView.setMapPolygon(this.walkCourseList.points);
  //   this.mapView.showMapPoint();
  //   this.mapView.showWalkBanner(this.walkCourseList.points);
  // }
  

}