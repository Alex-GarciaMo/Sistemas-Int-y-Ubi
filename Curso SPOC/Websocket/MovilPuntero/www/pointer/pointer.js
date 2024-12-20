const socket = io();

if ('AbsoluteOrientationSensor' in window) {
  try {
    const sensor = new AbsoluteOrientationSensor({ frequency: 60 });
    socket.on("connect", () => {
      socket.emit("POINTER_CONNECTED");
    });

    let calibrate = true;
    let initPos = [0, 0];

    document.body.addEventListener("click", (e) => {
      calibrate = true;
    })

    socket.on("ACK_CONNECTION", () => {
      sensor.onreading = (e) => {
        const quat = e.target.quaternion;
        const angles = toEulerYawPitch(quat);
        if (calibrate) {
          initPos = angles;
          calibrate = false;
        }

        socket.emit("SENSOR_READING", angles.map((angle, i) => calcDist(angle, initPos[i])));
      };
      sensor.start();
    });
  } catch (err) {
    console.log(err);
  }
}

function toEulerYawPitch(q) {
  const sinp = Math.sqrt(1 + 2 * (q[3] * q[1] - q[0] * q[2]));
  const cosp = Math.sqrt(1 - 2 * (q[3] * q[1] + q[0] * q[2]));
  const pitch = 2 * Math.atan2(sinp, cosp) - Math.PI / 2;


  const siny_cosp = 2 * (q[3] * q[2] + q[0] * q[1]);
  const cosy_cosp = 1 - 2 * (q[1] * q[1] + q[2] * q[2]);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  return [yaw, pitch];
}

function calcDist(angle, initAngle) {

  angle = (angle - initAngle) * (180 / Math.PI);
  angle = angle < 0 ? angle + 360 : angle;
  angle = angle > 180 ? angle - 360 : angle;
  console.log(angle, Math.tan(angle * (Math.PI / 180)))
  const dist = Math.round(-1000 * Math.tan(angle * (Math.PI / 180)));
  return dist;
}

