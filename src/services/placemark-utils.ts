import { LatLng } from "leaflet";
import type { ChartData } from "./charts";
import type { Placemark, CategoryPlacemarks } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(placemarks: Placemark[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    placemarks.forEach((placemark) => {
        markerSpecs.push({
            id: placemark._id,
            title: `${placemark.category.name}`,
            location: new LatLng(placemark.lat, placemark.lng),
            popup: true
        });
    });
    return { title: "placemarks", markerSpecs: markerSpecs };
}

export function generateByCategory(placemarksByCategory: CategoryPlacemarks[]): ChartData {
    const totalByCategory: ChartData = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };

    placemarksByCategory.forEach((placemarkByCategory) => {
        const label = `${placemarkByCategory.category.name}`;
        totalByCategory.labels.push(label);
        let total = 0;
        placemarkByCategory.placemarks.forEach(() => {
            total += 1;
        });
        totalByCategory.datasets[0].values.push(total);
    });
    return totalByCategory;
}

export function generateByArea(placemarkList: Placemark[]): ChartData {
    const totalByArea: ChartData = {
        labels: ["NI", "RoI"],
        datasets: [
            {
                values: [0, 0]
            }
        ]
    };

    placemarkList.forEach((placemark) => {
        if (placemark.area == "NI") {
            totalByArea.datasets[0].values[0] += 1;
        } else if (placemark.area == "RoI") {
            totalByArea.datasets[0].values[0] += 1;
        }
    });

    return totalByArea;
}