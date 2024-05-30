import { Participant } from "../models/participants.js";
import { default as jwt } from "jsonwebtoken";
import { SECRET } from "./auth.js";
import { ObjectId } from "mongodb";
import { Admin } from "../models/admin.js";

const checkToken = (req, res, next) => {
    const token = req.body.jwtToken;

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized user",
            success: false,
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user",
                success: false,
            });
        }

        Admin.findById(decoded.adminId)
            .then((response) => {
                if (!response) {
                    return res.status(401).json({
                        status: 404,
                        message: "User not found",
                        success: false,
                    });
                }

                res.status(200).json({
                    status: 200,
                    message: "Authorized",
                    success: true,
                });
            })
            .catch(() => {
                res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    success: false,
                });
            });
    });
};

const getEventParticipants = (req, res, next) => {
    const token = req.body.jwtToken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized user",
            success: false,
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user",
                success: false,
            });
        }

        // token is valid
        const eventId = req.body.eventId;
        if (!eventId) {
            return res.status(400).json({
                status: 400,
                message: "Missing Fields",
                success: false,
            });
        }

        Admin.findById(decoded.adminId)
            .then((admindata) => {
                if (!admindata) {
                    return res.status(401).json({
                        status: 401,
                        message: "Unauthorized user",
                        success: false,
                    });
                }

                return Participant.find({ event_id: new ObjectId(eventId) });
            })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Missing Fields",
                        success: false,
                    });
                }

                return res.status(200).json({
                    status: 200,
                    message: "Records Found",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    success: false,
                });
            });
    });
};

const getParticipantById = (req, res, next) => {
    const token = req.body.jwtToken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized user",
            success: false,
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user",
                success: false,
            });
        }

        // token is valid
        const participantId = req.body.userId;
        const eventId = req.body.eventId;
        if (!participantId || !eventId) {
            return res.status(400).json({
                status: 400,
                message: "Missing Fields",
                success: false,
            });
        }

        Admin.findById(decoded.adminId)
            .then((admindata) => {
                if (!admindata) {
                    return res.status(401).json({
                        status: 401,
                        message: "Unauthorized user",
                        success: false,
                    });
                }

                return Participant.findById(participantId);
            })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Missing Fields",
                        success: false,
                    });
                }

                if (result.event_id.toString() !== eventId) {
                    return res.status(404).json({
                        status: 404,
                        message: "Missing Fields",
                        success: false,
                    });
                }

                return res.status(200).json({
                    status: 200,
                    message: "Participant Found",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    success: false,
                });
            });
    });
};

const deleteParticipantById = (req, res, next) => {
    const token = req.body.jwtToken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized user",
            success: false,
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized user",
                success: false,
            });
        }

        // token is valid
        const participantId = req.body.userId;
        if (!participantId) {
            return res.status(400).json({
                status: 400,
                message: "Missing Fields",
                success: false,
            });
        }

        Admin.findById(decoded.adminId)
            .then((admindata) => {
                if (!admindata) {
                    return res.status(401).json({
                        status: 401,
                        message: "Unauthorized user",
                        success: false,
                    });
                }

                return Participant.findByIdAndDelete(participantId);
            })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({
                        status: 404,
                        message: "Missing Fields",
                        success: false,
                    });
                }

                return res.status(200).json({
                    status: 200,
                    message: "Participant Deleted",
                    success: true,
                    data: result,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    success: false,
                });
            });
    });
};

export {
    getEventParticipants,
    getParticipantById,
    checkToken,
    deleteParticipantById,
};