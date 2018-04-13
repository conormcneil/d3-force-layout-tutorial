let _classes = [{
    "name": ["Aligned_Values"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Aligned_Values"],
    "submitter_name": ["Todd King"],
    "definition": ["The Aligned_Values class describes the values which align element-by-element with the elements of a observation data array. The aligned values array must have the same dimensions as the observation array."],
    "DD_Association": [{
        "local_identifier": ["particle.Local_Internal_Reference"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }]
}, {
    "name": ["Axis_Values"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Axis_Values"],
    "submitter_name": ["Todd King"],
    "definition": ["The Axis_Values class describes the values which are associated with the elements along an axis of a observation data array."],
    "DD_Association": [{
        "local_identifier": ["particle.Local_Internal_Reference"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["particle.axis_number"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }]
}, {
    "name": ["Face_Values"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Face_Values"],
    "submitter_name": ["Todd King"],
    "definition": ["The Face_Values class describes the values which are associated with the elements on the face of a observation data array."],
    "DD_Association": [{
        "local_identifier": ["particle.Local_Internal_Reference"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["particle.Face_Plane"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }]
}, {
    "name": ["Face_Plane"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Face_Plane"],
    "submitter_name": ["Todd King"],
    "definition": ["The Face_Plane class describes a plane which is defined by two axes."],
    "DD_Association": [{
        "local_identifier": ["particle.face_axis"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["2"],
        "maximum_occurrences": ["2"]
    }]
}, {
    "name": ["Local_Internal_Reference"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Local_Internal_Reference"],
    "submitter_name": ["Todd King"],
    "definition": ["The Local_Internal_Reference class is used to cross-reference other classes or objects within the product."],
    "DD_Association": [{
        "local_identifier": ["pds.local_identifier_reference"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["particle.local_reference_type"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["pds.comment"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["0"],
        "maximum_occurrences": ["1"]
    }]
}, {
    "name": ["Particle_Observation"],
    "version_id": ["1.1"],
    "local_identifier": ["particle.Particle_Observation"],
    "submitter_name": ["Todd King"],
    "definition": ["The Particle_Observation describes the data of a observation and the values which are associated with the elements along an axis or on the face of a observation data array."],
    "DD_Association": [{
        "local_identifier": ["pds.name"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["pds.local_identifier"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["0"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["pds.description"],
        "reference_type": ["attribute_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["particle.Primary_Values"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }, {
        "local_identifier": ["particle.Axis_Values"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["0"],
        "maximum_occurrences": ["*"]
    }, {
        "local_identifier": ["particle.Face_Values"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["0"],
        "maximum_occurrences": ["*"]
    }, {
        "local_identifier": ["particle.Aligned_Values"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["0"],
        "maximum_occurrences": ["*"]
    }]
}, {
    "name": ["Primary_Values"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.Primary_Values"],
    "submitter_name": ["Todd King"],
    "definition": ["The Primary_Values class describes the values which are the primary observation data array."],
    "DD_Association": [{
        "local_identifier": ["particle.Local_Internal_Reference"],
        "reference_type": ["component_of"],
        "minimum_occurrences": ["1"],
        "maximum_occurrences": ["1"]
    }]
},
// DD_Attribute
{
    "name": ["axis_number"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.axis_number"],
    "nillable_flag": ["false"],
    "submitter_name": ["Todd King"],
    "definition": ["The index of the axis. The first axis is numbered as 1."],
    "DD_Value_Domain": [{
        "enumeration_flag": ["false"],
        "value_data_type": ["ASCII_Integer"],
        "unit_of_measure_type": ["Units_of_None"],
        "minimum_value": ["1"]
    }]
}, {
    "name": ["face_axis"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.face_axis"],
    "nillable_flag": ["false"],
    "submitter_name": ["Todd King"],
    "definition": ["The axis number that defines one axis of a face plane."],
    "DD_Value_Domain": [{
        "enumeration_flag": ["false"],
        "value_data_type": ["ASCII_Integer"],
        "unit_of_measure_type": ["Units_of_None"],
        "minimum_value": ["1"]
    }]
}, {
    "name": ["local_reference_type"],
    "version_id": ["1.0"],
    "local_identifier": ["particle.local_reference_type"],
    "nillable_flag": ["false"],
    "submitter_name": ["Todd King"],
    "definition": ["The local_reference_type attribute provides the name of an association between an entity identified by a local_identifier_reference and another corresponding entity identified by a local_identifier"],
    "DD_Value_Domain": [{
        "enumeration_flag": ["true"],
        "value_data_type": ["ASCII_Short_String_Collapsed"],
        "unit_of_measure_type": ["Units_of_None"],
        "DD_Permissible_Value": [{
            "value": ["particle_observation_to_observation_values"],
            "value_meaning": ["A reference to the array containing the primary observation data."]
        }, {
            "value": ["particle_observation_to_axis_values"],
            "value_meaning": ["A reference to the array containing the data values for an axis of primary observation data."]
        }, {
            "value": ["particle_observation_to_face_values"],
            "value_meaning": ["A reference to the array containing the data values for a face of primary observation data."]
        }, {
            "value": ["particle_observation_to_aligned_values"],
            "value_meaning": ["A reference to an array that has an identical array structure (in both axis definitions, and number of elements) as the primary observation data array."]
        }]
    }]
}];

