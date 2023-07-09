export function generateDiskPoints(minRadius, maxRadius, numPoints, thickness, normalAxis) {
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        // Generate random radius and angle
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const angle = Math.random() * 2 * Math.PI;

        // Calculate the coordinates of the point
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() * thickness) - (thickness / 2); // Assuming the normal axis is along the z-axis

        // Rotate the point based on the normal axis
        const rotatedPoint = rotatePointAroundAxis({ x, y, z }, normalAxis, angle);

        points.push(rotatedPoint);
    }

    return points;
}
export function projectTo2D(x, y, z) {
    // Define the camera position and orientation
    const camera = { x: 0, y: 0, z: 500 };

    // Define the projection plane distance from the camera
    const planeDistance = 200;

    // Calculate the projection
    const scaleFactor = planeDistance / (camera.z - z);
    const projectedX = camera.x + (x - camera.x) * scaleFactor;
    const projectedY = camera.y + (y - camera.y) * scaleFactor;

    return { x: projectedX, y: projectedY };
}
export function rotateDisks(disks, axis, angle) {
    for (let i = 0; i < disks.length; i++) {
        const disk = disks[i].points;
        for (let j = 0; j < disk.length; j++) {
            const point = disk[j];
            const rotatedPoint = rotatePointAroundAxis(point, axis, angle);
            disk[j] = rotatedPoint;
        }
    }
}
function rotatePointAroundAxis(point, axis, angle) {
    const { x, y, z } = point;
    const { x: axisX, y: axisY, z: axisZ } = axis;

    // Convert the angle from degrees to radians
    const radians = (angle * Math.PI) / 180;

    // Calculate trigonometric values
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);

    // Calculate the dot product between the point and axis
    const dotProduct = x * axisX + y * axisY + z * axisZ;

    // Calculate the cross product between the point and axis
    const crossProductX = y * axisZ - z * axisY;
    const crossProductY = z * axisX - x * axisZ;
    const crossProductZ = x * axisY - y * axisX;

    // Calculate the rotated point
    const rotatedX =
        x * cosTheta + crossProductX * sinTheta + axisX * dotProduct * (1 - cosTheta);
    const rotatedY =
        y * cosTheta + crossProductY * sinTheta + axisY * dotProduct * (1 - cosTheta);
    const rotatedZ =
        z * cosTheta + crossProductZ * sinTheta + axisZ * dotProduct * (1 - cosTheta);

    return { x: rotatedX, y: rotatedY, z: rotatedZ };
}