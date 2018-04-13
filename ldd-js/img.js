let _classes = [
    {
        "name": ["gain_mode_id"],
        "version_id": ["1.0"],
        "local_identifier": ["gain_mode_id"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The gain_mode_id attribute identifies the gain state of an instrument. Gain is a\n      constant value which is multiplied with an instrument's output signal to increase or decrease\n      the level of that output. These modes may vary by mission so the permissible values should be set \n      by the mission dictionaries."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["gain_number"],
        "version_id": ["1.0"],
        "local_identifier": ["gain_number"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The gain_number attribute specifies the gain value used in the analog to digital conversion. The gain value is a multiplicative factor used in the analog to digital conversion."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["analog_offset"],
        "version_id": ["1.0"],
        "local_identifier": ["analog_offset"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The analog_offset attribute identifies the analog value that is subtracted from the\n      signal prior to the analog/digital conversion."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["active_flag"],
        "version_id": ["1.0"],
        "local_identifier": ["active_flag"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The active_flag attribute indicates whether or not the data correction described\n    by the parent class is active."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Boolean"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["compression_type"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_type"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The compression_type attribute identifies the type of on-board\n        compression used for data storage and transmission. Note: The compression_mode\n        identifies the shortened version. Valid Values: 'ICER', 'LOCO',\n        'JPEG', 'JPEG Progressive', 'MSSS Lossless'."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "minimum_characters": ["1"],
            "maximum_characters": ["255"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["ICER"],
                "value_meaning": ["ICER Adaptive Variable-Length Coding (ICER)"]
            }, {
                "value": ["ICT"],
                "value_meaning": ["Integer Cosine Transform"]
            }, {
                "value": ["LOCO"],
                "value_meaning": ["Low-Complexity Lossless Compression"]
            }, {
                "value": ["JPEG"],
                "value_meaning": ["Joint Photographic Experts Group, an industry standard lossy compression algorithm."]
            }, {
                "value": ["JPEG Progressive"],
                "value_meaning": ["interlaced progressive JPEG format, in which data is compressed in multiple passes of progressively higher detail."]
            }, {
                "value": ["MSSS Lossless"],
                "value_meaning": ["Lossless compression algorithm developed by Malin Space Science Systems."]
            }]
        }]
    }, {
        "name": ["compression_mode"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_mode"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The compression_mode attribute identifies the method used for on-board\n      compression of data. The value for this attributes represents the raw integer value for compression, which is then translated to \n      the full name captured by the compression_type attribute."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["color_subsampling_mode"],
        "version_id": ["1.0"],
        "local_identifier": ["color_subsampling_mode"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The color_subsampling_mode attribute specifies the JPEG color subsampling mode used during compression. Valid values: '4:2:2' - 4:2:2 chroma subsampling, which is the typical case, '4:4:4' - 4:4:4 chroma sampling, which indicates no subsampling, 'Grayscale' - indicates a grayscale image"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["4:4:4"],
                "value_meaning": ["Indicates 4:4:4 chroma sampling. Each of the three Y'CbCr components have the same sample rate, thus there is no chroma subsampling"]
            }, {
                "value": ["4:2:2"],
                "value_meaning": ["indicates 4:2:2 chroma subsampling. The typical case. The two chroma components are sampled at half the sample rate of luma: the horizontal chroma resolution is halved. This reduces the bandwidth of an uncompressed video signal by one-third with little to no visual difference."]
            }, {
                "value": ["Grayscale"],
                "value_meaning": ["indicates a grayscale image"]
            }]
        }]
    }, {
        "name": ["compression_rate"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_rate"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The compression_rate attribute provides the average number of bits needed\n      to represent a pixel for an on-board compressed image. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["compression_ratio"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_ratio"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The compression_ratio attribute provides the ratio of the size, in bytes, of the\n      original uncompressed data object to its compressed form (original size / compressed size). "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0.0"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["compression_quality"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_quality"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The compression_quality attribute is an indication of compression quality, in the range of 0.0 to\n      1.0. Losslessly compressed or uncompressed data have a value of 1.0. \n      Other values are assigned in a manner specific to the compression mode,\n      but with the property that a higher value means better compression.\n      Although the values are not directly comparable across compression\n      types, this facilitates comparison of compression quality across images\n      independent of compression mode."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0"],
            "maximum_value": ["1.0"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["deferred_flag"],
        "version_id": ["1.0"],
        "local_identifier": ["deferred_flag"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The deferred_flag attribute specifies whether compression was done at the time of image acquisition, or was deferred until later (typically at downlink time). "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Boolean"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["error_pixel_count"],
        "version_id": ["1.0"],
        "local_identifier": ["error_pixel_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Cristina De Cesare"],
        "definition": [" The error_pixel_count attribute specifies the number of pixels that are outside a valid DN range, after all decompression and post decompression processing has been completed. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["jpeg_quality"],
        "version_id": ["1.0"],
        "local_identifier": ["jpeg_quality"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The jpeg_quality attribute is a JPEG specific variable which\n      identifies the resultant or targeted image quality index for on-board data compression."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "maximum_value": ["100"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["progressive_stage"],
        "version_id": ["1.0"],
        "local_identifier": ["progressive_stage"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The progressive_stage attribute specifies TBD"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["decomposition_stages"],
        "version_id": ["1.0"],
        "local_identifier": ["decomposition_stages"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The decomposition_stages attribute identifies the number of stages of decomposition."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["jpeg_parameter"],
        "version_id": ["1.0"],
        "local_identifier": ["jpeg_parameter"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The jpeg_parameter attribute is a JPEG specific variable which\n      specifies on-board compression determination by image quality or by compression factor, based\n      on a selected on-board compression mode. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["segment_count"],
        "version_id": ["1.0"],
        "local_identifier": ["segment_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The segment_count attribute identifies the number of segments into\n      which the image was partitioned for error containment purposes."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["compression_class"],
        "version_id": ["1.0"],
        "local_identifier": ["compression_class"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The compression_class attribute\n      identifies the type of on-board compression used for data\n      storage and transmission. Note that the\n      compression_type and compression_mode identify the specific\n      compression algorithm used (for example, ICER), whereas the compression_class gives a simple\n      indicator of the type of compression mode. Valid values: \n      'Lossless', 'Lossy', 'Uncompressed'"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Lossless"],
                "value_meaning": ["TBD"]
            }, {
                "value": ["Lossy"],
                "value_meaning": ["TBD"]
            }, {
                "value": ["Uncompressed"],
                "value_meaning": ["TBD"]
            }]
        }]
    }, {
        "name": ["wavelet_filter"],
        "version_id": ["1.0"],
        "local_identifier": ["wavelet_filter"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The wavelet_filter attribute specifies thefilter used in the compression and decompression algorithm."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["icer_quality"],
        "version_id": ["1.0"],
        "local_identifier": ["icer_quality"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The icer_quality attribute is a ICER specific variable for on-board ICER data compression."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "maximum_value": ["18"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["segment_number"],
        "version_id": ["1.0"],
        "local_identifier": ["segment_number"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The segment_number attribute identifies which compression segment is described in\n      the current Segment class. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["missing_pixel_count"],
        "version_id": ["1.0"],
        "local_identifier": ["missing_pixel_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The missing_pixel_count attribute identifies the total number of missing pixels\n      defined by the image or image segment."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["segment_status"],
        "version_id": ["1.0"],
        "local_identifier": ["segment_status"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The segment_status attribute provides a bit mask which provides the status of\n      decoding for the compression segment identified by segment_number. Upon return by the ICER decompress function, \n      the output quantity of segment_status contains a number indicating the decode status. The decode status may have one or more of the following flags set: \n      SHORTDATASEG FLAG (bit 0): If this flag is set, then the segment contained so little data that nothing could be reconstructed in the segment. \n      INCONSISTENTDATA FLAG (bit 1): If this flag is set, then one or more pieces of information in the segment header (specifically, image width, image height, n segs, wavelet filter, n decomps) are inconsistent with the value(s) in the first (valid) segment. ICER will ignore the data in this segment.\n      DUPLICATESEG FLAG (bit 2): If this flag is set, then the segment index given in the header equals that given by a previous segment. The decompressor will ignore the data in this segment. \n      BADBITPLANENUMBER FLAG (bit 3): If this flag is set, then an ICER internal parameter in the header for this segment has probably been corrupted. The decompressor will ignore the data in this segment. \n      BADBITPLANECOUNT FLAG (bit 4): If this flag is set, then an ICER internal parameter in the header for this segment has probably been corrupted. The decompressor will ignore the data in this segment. \n      BADDATA FLAG (bit 5): If this flag is set, then either the parameter combination given in the header for this segment are not allowed by ICER, or the segment number is bad. This probably indicates corrupted data. The decompressor will ignore the data in this segment. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Numeric_Base2"],
            "minimum_characters": ["1"],
            "maximum_characters": ["6"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["segment_quality"],
        "version_id": ["1.0"],
        "local_identifier": ["segment_quality"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The segment_quality attribute identifies the resultant or targeted image quality index for on-board ICER data compression. Upon return by the ICER decompress function,\n      the output quantity segment_quality provides an indication of the quality of the reconstructed segment. Specifically, the value returned is a double for which the integer values \n      correspond to attained min loss values, but in general is an interpolation between these values. Thus lower values of segment_quality correspond to higher reconstructed qualities, \n      and a value of indicates lossless compression. Note that the compressed stream does not directly contain the value of min loss that was given to the compressor, but the decompressor \n      does know how far along in the decompression process it got before it ran out of bits; this information is used to determine segment_quality. In rare circumstances the decompressor m\n      ay not be able to determine segment_quality for a segment that it decompresses. In this case it sets segment_quality to 1.0. The reconstructed segment might be either lossy or lossless \n      when this occurs. The technical condition under which a quality value is not determined is that the decompressor runs out of the data for the segment before decoding any bit plane information. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["autoexposure_algorithm_name"],
        "version_id": ["1.0"],
        "local_identifier": ["autoexposure_algorithm_name"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The autoexposure_algorithm_name attribute provides the algorithm used for histograwm thresholding or autoexposure of the image.\n      Some example algorithms from past missions are, 'Maki 2003' used on MER cameras, MSL ECAMs, M2020 EECAMs; 'Maurice 2012' used on MSL ChemCam; 'Smith 1997' used on Mars Pathfinder Imager."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["frame_id"],
        "version_id": ["1.0"],
        "local_identifier": ["frame_id"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The frame_id attribute specifies an identification for a particular instrument measurement frame. A frame \n      consists of a sequence of measurements made over a specified time interval, and may include measurements from different \n      instrument modes. These sequences repeat from cycle to cycle and sometimes within a cycle."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["frame_type_name"],
        "version_id": ["1.0"],
        "local_identifier": ["frame_type_name"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The frame_type_name attribute specifies whether the image was commanded as part of a\n      stereo pair or as a single left or right monoscopic image. If frame_type = 'Stereo', a left and a\n      right image should be present."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["interframe_delay"],
        "version_id": ["1.0"],
        "local_identifier": ["interframe_delay"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The interframe_delay attribute provides the time between successive frames of an image, in seconds."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0"],
            "unit_of_measure_type": ["Units_of_Time"]
        }]
    }, {
        "name": ["subframe_type"],
        "version_id": ["1.0"],
        "local_identifier": ["subframe_type"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The subframe_type attribute specifies the method of subframing performed on the\n      image. These methods may vary by mission so the permissible values should be set \n      by the mission dictionaries. Example values from MSL include a) 'Software Only' - Software processsing only.\n      b) 'Hardware Compatible' - Use hardware only if compatible. c) 'Hardware Else Software' - Use hardware then software.\n      d) 'Subframe Around Sun' - If the sun is found, send a subframed image of the sun. If sun is not found, send back no image."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["first_line"],
        "version_id": ["1.0"],
        "local_identifier": ["first_line"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The first_line attribute indicates the line within a source image that corresponds\n      to the first line in a sub-image."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["first_sample"],
        "version_id": ["1.0"],
        "local_identifier": ["first_sample"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": [" The first_sample attribute indicates the sample within a source image that\n      corresponds to the first sample in a sub-image. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["lines"],
        "version_id": ["1.0"],
        "local_identifier": ["lines"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The lines attribute indicates the total number of\n      data instances along the vertical axis of an image or sub-image."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["samples"],
        "version_id": ["1.0"],
        "local_identifier": ["samples"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": [" The samples attribute indicates the total number of data instances along the horizontal\n      axis of an image or sub-image."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["crosstrack_summing"],
        "version_id": ["1.0"],
        "local_identifier": ["crosstrack_summing"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The crosstrack_summing attribute provides the number of detector pixel values in the\n      crosstrack direction that have been averaged to produce the final output pixel."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["downtrack_summing"],
        "version_id": ["1.0"],
        "local_identifier": ["downtrack_summing"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The downtrack_summing attribute provides the number of detector pixel values in the\n      downtrack direction that have been averaged to produce the final output pixel."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["sample_bits"],
        "version_id": ["1.0"],
        "local_identifier": ["sample_bits"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The sample_bits attribute specifies the logical or active number of bits in the data, which is distinct from the physical number of bits (for example, encoding 12-bit data within 16-bit words). These logical bits are stored in the low order (least significant) bits, with unused bits filled with 0 (or 1 for negative integers to preserve a two's complement representation). This is distinct from the valid data range (specified by valid_minimum and valid_maximum in Special_Constants class) because all values, including missing/invalid flag values, must fit within the sample_bits. The intent is that the data should be able to be sent through a communication channel that passes only sample_bits with no loss in fidelity."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["sample_bit_mask"],
        "version_id": ["1.0"],
        "local_identifier": ["sample_bit_mask"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The sample_bit_mask attribute Specifies the active bits in a sample. Any bit mask is valid \n      in an non-raw product. Any 8-bit product, whether a scaled raw product or other, will have the value \n      \"2#11111111\" and be stored in one byte. Any 12-bit product, whether an unscaled raw product, or an ILUT partially-processed product\n      (see companding_method), will have the value \"2#0000111111111111\" and be stored in two bytes. A 15-bit product \n      (e.g. Radiometrically-corrected Calibrated product type) will have the value \"2#0111111111111111\" and be stored in two bytes. \n      Any 32-bit integer product (e.g. Histogram Raw product) will have the value \"2#11111111111111111111111111111111\" \n      and be stored in four bytes. For floating-point data, sample_bit_mask is not valid and may be absent. If present, it \n      should be ignored. NOTE: In the PDS, the domain of sample_bit_mask is dependent upon the currently-described value \n      in the sample_bits attribute and only applies to integer values."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["companding_state"],
        "version_id": ["1.0"],
        "local_identifier": ["companding_state"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The companding_state attribute specifies whether the data is or has had its bit\n      depth reduced, for example conversion from 12 to 8 bits via a lookup\n      table or bit scaling. Valid values: None - values have not been companded.\n      Companded - values are currently companded. Expanded - values have been companded but are now expanded back to original size."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["None"],
                "value_meaning": ["values have not been companded"]
            }, {
                "value": ["Companded"],
                "value_meaning": ["values are currently companded"]
            }, {
                "value": ["Expanded"],
                "value_meaning": ["values have been companded but are now expanded back to original size"]
            }]
        }]
    }, {
        "name": ["companding_venue"],
        "version_id": ["1.0"],
        "local_identifier": ["companding_venue"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The companding_venue attribute specifies where companding or expanding of the data was completed either \n      onboard or on the ground.\n      Valid values: 'Hardware' - companding was done by hardware, for example inside the camera.\n      'Software' - companding was done by flight software.\n      'None' - data was not companded"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Hardware"],
                "value_meaning": ["companding was done by hardware, for example inside the camera."]
            }, {
                "value": ["Software"],
                "value_meaning": ["companding was done by flight software."]
            }, {
                "value": ["None"],
                "value_meaning": ["data was not companded"]
            }]
        }]
    }, {
        "name": ["companding_method"],
        "version_id": ["1.0"],
        "local_identifier": ["companding_method"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The companding_method attribute specifies how data was companded.  Generally this\n      will either be via a lookup table (such as a square root encoding), or\n      by shifting bits to preserve the high order bits and discard the low\n      order bits.  The value of this keyword is mission specific but there are\n      recommended values that should apply across missions when possible: NONE - no scaling.\n      LUTn - use the numbered lookup table.  Lookup tables are defined in the\n      mission SIS.  It is preferred for \"n\" to be a number but it could be a\n      name, for example LUT_MMM_3 to indicate LUT 3 for the MMM instruments\n      (on MSL). MSB_BITn - Shift to make bit \"n\" the most significant.  Bits start\n      numbering at 0 so MSB_BIT7 means no shift for a 12->8 bit companding,\n      while MSB_BIT11 means to shift right 4 bits for a 12->8 bit companding.\n      AUTOSHIFT - Data should be shifted to preserve the highest value.  This\n      value should only appear in a command echo; one of the MSB_BITn values\n      should be used in downlinked data to specify what the actual shift was."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["sampling_factor"],
        "version_id": ["1.0"],
        "local_identifier": ["sampling_factor"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The sampling_factor attribute provides the value N, where every Nth data point was kept from the original data set by selection, averaging, or taking the median. When applied to an image object, the single value represented in sampling_factor applies to both the lines and the samples."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["downsampling_flag"],
        "version_id": ["1.0"],
        "local_identifier": ["downsampling_flag"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The downsampling_flag attribute specifies whether or not downsampling has been applied to the image(s)."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Boolean"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["downsampling_venue"],
        "version_id": ["1.0"],
        "local_identifier": ["downsampling_venue"],
        "nillable_flag": ["true"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The downsampling_venue attribute specifies where downsampling was done onboard.\n      Valid values: 'Hardware' - downsampling was done by hardware, for example inside the camera.\n      'Software' - downsampling was done by flight software.\n      'Both' - data was not companded."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Hardware"],
                "value_meaning": ["downsampling was done by hardware, for example inside the camera."]
            }, {
                "value": ["Software"],
                "value_meaning": ["downsampling was done by flight software."]
            }, {
                "value": ["Both"],
                "value_meaning": ["downsampling occurred in both hardware and software"]
            }]
        }]
    }, {
        "name": ["downsampling_method"],
        "version_id": ["1.0"],
        "local_identifier": ["downsampling_method"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The downsampling_method attribute specifies the pixel resolution downsample method used. This varies by mission, but examples from MSL include:\n      'Mean' - Downsampling done in software by calculation of the mean.,\n      'Conditional' - Use hardware binning if downsampling (by mean calculation) and subframe arguments are consistent."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["detector_erase_count"],
        "version_id": ["1.0"],
        "local_identifier": ["detector_erase_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The detector_erase_count specifies the number of times a detector has been or will be flushed\n      of data in raw counts, dependent on the parent class for the attribute."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["azimuth_fov"],
        "version_id": ["1.0"],
        "local_identifier": ["azimuth_fov"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The azimuth_fov attribute specifies the angular measure of the horizontal field of\n      view of an imaged scene. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0.0"],
            "maximum_value": ["360.0"],
            "unit_of_measure_type": ["Units_of_Angle"],
            "specified_unit_id": ["deg"]
        }]
    }, {
        "name": ["elevation_fov"],
        "version_id": ["1.0"],
        "local_identifier": ["elevation_fov"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The elevation_fov attribute specifies the angular measure of the vertical field of\n      view of an imaged scene. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0.0"],
            "maximum_value": ["360.0"],
            "unit_of_measure_type": ["Units_of_Angle"],
            "specified_unit_id": ["deg"]
        }]
    }, {
        "name": ["detector_first_line"],
        "version_id": ["1.0"],
        "local_identifier": ["detector_first_line"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The detector_first_line attribute specifies the starting row from the hardware, \n      such as a charge-coupled device (CCD), that contains data."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["detector_first_sample"],
        "version_id": ["1.0"],
        "local_identifier": ["detector_first_sample"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The detector_first_sample attribute specifies the starting column from the hardware, \n      such as a charge-coupled device (CCD), that contains data."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["detector_lines"],
        "version_id": ["1.0"],
        "local_identifier": ["detector_lines"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The detector_lines attribute specifies the number of rows extracted from the hardware, \n      such as a charge-coupled device (CCD), that contain data."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["detector_to_image_rotation"],
        "version_id": ["1.0"],
        "local_identifier": ["detector_to_image_rotation"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The detector_to_image_rotation attribute specifies the clockwise rotation, in\n      degrees, that was applied to an image along its optical path through an instrument, from\n      detector to final image orientation. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0.0"],
            "maximum_value": ["360.0"],
            "unit_of_measure_type": ["Units_of_Angle"],
            "specified_unit_id": ["deg"]
        }]
    }, {
        "name": ["exposure_count"],
        "version_id": ["1.0"],
        "local_identifier": ["exposure_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The exposure count attribute provides the number of exposures taken during a certain interval,\n      such as the duration of one command.  For example, this may include the\n      number of exposures needed by an autoexpose algorithm."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["exposure_duration"],
        "version_id": ["1.0"],
        "local_identifier": ["exposure_duration"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The exposure_duration attribute provides the amount of time the\n      instrument sensor was gathering light from the scene, such as between\n      opening and closing of a shutter, or between flushing and readout of a CCD."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "minimum_value": ["0"],
            "unit_of_measure_type": ["Units_of_Time"]
        }]
    }, {
        "name": ["exposure_duration_count"],
        "version_id": ["1.0"],
        "local_identifier": ["exposure_duration_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The exposure_duration_count attribute specifies the value, in raw counts, for the amount of time the\n      instrument sensor was gathering light from the scene, such as between\n      opening and closing of a shutter, or between flushing and readout of a CCD. This is the raw count either commanded or taken \n      directly from telemetry as reported by the spacecraft. This attribute is the same as the exposure_duration but in DN counts versus time,\n      and the translation of exposure_duration_count to exposure_duration will differ by mission. The attribute can be specified in the context of both \n      Imaging_Instrument_State_Parameters (actual value) and Command_Parameters (commanded value). Both commanded and actual because it's possible for\n      the actual to not match the commanded. For example the exposure might fault out early, or there might be a\n      deadband (for example, pointing backlash) where changes in the input do not actually affect the output."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["exposure_type"],
        "version_id": ["1.0"],
        "local_identifier": ["exposure_type"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The exposure_type attribute indicates the exposure setting on a camera. Valid values: \n      'Manual' - manual exposure setting, 'Auto' - autoexposure is applied by the camera, 'Test' - test exposure setting telling the camera to return a fixed-pattern test image."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Manual"],
                "value_meaning": ["manual exposure setting"]
            }, {
                "value": ["Auto"],
                "value_meaning": ["autoexposure is applied by the camera"]
            }, {
                "value": ["Test"],
                "value_meaning": ["test exposure setting telling the camera to return a fixed-pattern test image."]
            }]
        }]
    }, {
        "name": ["creation_sclk"],
        "version_id": ["1.0"],
        "local_identifier": ["creation_sclk"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The creation_sclk attribute specifies the value of the spacecraft clock at\n      the time the data or product was created on board a spacecraft. This value is not always co-incident\n      with the data acquisition time."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["creation_date_time"],
        "version_id": ["1.0"],
        "local_identifier": ["creation_date_time"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The creation_date_time attribute specifies the time, in standard UTC format,\n      that the data or product was created on board a spacecraft. This value is not always co-incident with the\n      data acquisition time."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Date_Time_YMD"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["expected_packets"],
        "version_id": ["0.1"],
        "local_identifier": ["expected_packets"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The expected_packets attribute provides the total number of telemetry packets which\n      constitute a complete data product, i.e., a data product without missing data."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["received_packets"],
        "version_id": ["0.1"],
        "local_identifier": ["received_packets"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The received_packets attribute provides the total number of telemetry packets which\n      constitute a reconstructed data product, cf. expected_packets."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["missing_packet_flag"],
        "version_id": ["1.0"],
        "local_identifier": ["missing_packet_flag"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The missing_packet_flag attribute indicates whether or not there were telemetry\n      packets that were expected but not received."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Boolean"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["packet_map_mask"],
        "version_id": ["0.1"],
        "local_identifier": ["packet_map_mask"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The packet_map_mask attribute is a binary or hexadecimal number identifying which of\n      a data file's expected packets were actually received. The digits correspond positionally with\n      the relative packet numbers of the data file. The bits are to be read left to right; i.e., the\n      first (left-most) digit of the number corresponds to the first packet of the data file. A bit\n      value of 1 indicates that the packet was received; a value of 0 indicates that it was not\n      received."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Numeric_Base16"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["height_pixels"],
        "version_id": ["1.0"],
        "local_identifier": ["height_pixels"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The height_pixels attribute provides the vertical dimension, in pixels."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_Misc"]
        }]
    }, {
        "name": ["width_pixels"],
        "version_id": ["1.0"],
        "local_identifier": ["width_pixels"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The width_pixels attribute provides the horizontal dimension, in pixels."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "minimum_value": ["1"],
            "unit_of_measure_type": ["Units_of_Misc"]
        }]
    }, {
        "name": ["device_name"],
        "version_id": ["1.0"],
        "local_identifier": ["device_name"],
        "nillable_flag": ["true"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The device_name attribute supplies the formal\n      name for an imaging instrument, an imaging instrument device, or some point on the instrument or device."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["temperature_value"],
        "version_id": ["1.0"],
        "local_identifier": ["temperature_value"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The temperature_value attribute provides the temperature, in the specified\n      units, of some point on an imaging instrument or other imaging instrument device."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_Temperature"]
        }]
    }, {
        "name": ["raw_count"],
        "version_id": ["1.0"],
        "local_identifier": ["raw_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The raw_count attribute provides the value of some parameter measured by a\n      spacecraft or instrument sensor in the raw units reported by that sensor. A separate attribute\n      should be included alongside the raw_count that translates this value into the appropriate\n      engineering units. i.e. temperature_value in degrees C or voltage_value in Volts"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["voltage_value"],
        "version_id": ["1.0"],
        "local_identifier": ["voltage_value"],
        "nillable_flag": ["true"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The voltage_value attribute provides provides the voltage, in the specified units, of an imaging instrument or some part of the imaging instrument."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_Voltage"]
        }]
    }, {
        "name": ["current_value"],
        "version_id": ["1.0"],
        "local_identifier": ["current_value"],
        "nillable_flag": ["true"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The current_value attribute provides provides the current, in the specified units, of an imaging instrument or some part of the imaging instrument."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_Current"]
        }]
    }, {
        "name": ["bayer_state"],
        "version_id": ["1.0"],
        "local_identifier": ["bayer_state"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The bayer_state attribute specifies whether or not the data is encoded in a Bayer\n      pattern. Valid values: 'No Bayer' - sensor does not support Bayer pattern, or the pattern is not relevant, \n      'Bayer Encoded' - data is Bayer encoded, 'Debayered' - Bayer pattern was removed."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["No Bayer"],
                "value_meaning": ["sensor does not support Bayer pattern, or the pattern is not relevant"]
            }, {
                "value": ["Bayer Encoded"],
                "value_meaning": ["Raw Bayer-encoded data"]
            }, {
                "value": ["Debayered"],
                "value_meaning": ["Bayer pattern was removed"]
            }]
        }]
    }, {
        "name": ["debayer_venue"],
        "version_id": ["1.0"],
        "local_identifier": ["debayer_venue"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The debayer_venue attribute specifies where the bayer pattern was removed. Valid values: 'Onboard', 'Ground'. Use the debayer_algorithm to specify the \n      algorithm used to remove the pattern."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Onboard"],
                "value_meaning": ["Bayer pattern was removed onboard"]
            }, {
                "value": ["Ground"],
                "value_meaning": ["Bayer pattern was removed by ground software"]
            }]
        }]
    }, {
        "name": ["debayer_algorithm"],
        "version_id": ["1.0"],
        "local_identifier": ["debayer_algorithm"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The debayer_algorithm specifies the algorithm used to remove the Bayer pattern\n      in order to create color. Valid values: Malvar, Zhang-Wu"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Malvar"],
                "value_meaning": ["Debayering using Malvar algorithm."]
            }, {
                "value": ["Zhang-Wu"],
                "value_meaning": ["Debayering using Zhang-Wu algorithm."]
            }]
        }]
    }, {
        "name": ["filter_name"],
        "version_id": ["1.0"],
        "local_identifier": ["filter_name"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The filter_name attribute provides the name, described in the mission documentation, of the instrument filter\n      through which an image or measurement was acquired or which is associated with a given\n      instrument mode."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "minimum_characters": ["1"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["filter_id"],
        "version_id": ["0.1"],
        "local_identifier": ["filter_id"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The filter_id attribute provides a short string identifier for an instrument filter\n      through which an image or measurement was acquired or which is associated with a given\n      instrument mode. "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "minimum_characters": ["1"],
            "maximum_characters": ["16"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["filter_number"],
        "version_id": ["1.0"],
        "local_identifier": ["filter_number"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The filter_number attribute provides the numeric identifier of an instrument filter\n      through which an image or measurement was acquired or which is associated with a given\n      instrument mode."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_NonNegative_Integer"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["bandwidth"],
        "version_id": ["1.0"],
        "local_identifier": ["bandwidth"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The bandwidth attribute provides a measure of the spectral width of a filter. For a root-mean-square detector \n      this is the effective bandwidth of the filter, i.e. the full width of an ideal square filter having a flat response over \n      the bandwidth and zero response elsewhere. Another common method for measuring bandwidth is Full Width at Half Maximum, \n      which is the width of a \"bump\" on a curve or function. It is given by the distance between points on the curve at which the function\n      reaches half of its maximum value."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_Frequency"]
        }]
    }, {
        "name": ["center_filter_wavelength"],
        "version_id": ["1.0"],
        "local_identifier": ["center_filter_wavelength"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The center_filter_wavelength attribute provides the wavelength of the center of the passband, or the peak \n      transmissivity, for an instrument filter.\n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_Length"]
        }]
    }, {
        "name": ["data_correction_type"],
        "version_id": ["1.0"],
        "local_identifier": ["data_correction_type"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The data_correction_type attribute specifies the type of data correction to be\n      applied using the accompanying file or constants. Valid values: 'Antiblooming', 'Bad Pixel',\n      'Blemish Protection', 'Brightness', 'Dark Current', 'Flat Field', 'Inverse LUT', 'Light Flood',\n      'Responsivity', 'Shutter'"],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Antiblooming"],
                "value_meaning": ["Blooming occurs when photons from an individual cell in a CCD array overflow into surrounding cells. Antiblooming measures are used to either prevent or correct for this effect."]
            }, {
                "value": ["Bad Pixel"],
                "value_meaning": ["certain pixels in the image were replaced based on a bad pixel table."]
            }, {
                "value": ["Blemish Protection"],
                "value_meaning": ["corrections for blemishes (reseaus, dust spots, etc.) that affect the response of the sensor at specific locations"]
            }, {
                "value": ["Brightness"],
                "value_meaning": [" as a mosaic radiometric seam matching process that is done on top of ordinary radiometric correction. Its intent is to reduce visual seams at the expense of radiometric accuracy."]
            }, {
                "value": ["Dark Current"],
                "value_meaning": ["a dark current image file(s) (image taken without opening the camera shutter) will be used to perform radiometric calibration of the image. "]
            }, {
                "value": ["Flat Field"],
                "value_meaning": ["a flat field image(s) file (an image taken in an optical laboratory of a white background or an image taken in the dawn with the intention to have an equally illuminated background for the whole image) which should be used to perform radiometric calibration of the image."]
            }, {
                "value": ["Inverse LUT"],
                "value_meaning": ["inverse-look-table was used in generating this derived product"]
            }, {
                "value": ["Light Flood"],
                "value_meaning": ["instrument light flooding as applied to the image"]
            }, {
                "value": ["Radiometric"],
                "value_meaning": ["radiometric correction was performed on this image"]
            }, {
                "value": ["Responsivity"],
                "value_meaning": ["responsitivity constants were used in generating this derived product"]
            }, {
                "value": ["Shutter Subtraction"],
                "value_meaning": ["Involves the removal from the image of the shutter, or fixed-pattern."]
            }]
        }]
    }, {
        "name": ["data_correction_venue"],
        "version_id": ["1.0"],
        "local_identifier": ["data_correction_venue"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The data_correction_venue attribute specifies where data correction was performed.\n      Valid values: 'Onboard' - data correction was performed onboard the spacecraft.\n      'Ground' - data correction was performed by software on the ground.\n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["Onboard"],
                "value_meaning": ["data correction was performed onboard the spacecraft."]
            }, {
                "value": ["Ground"],
                "value_meaning": ["data correction was performed by software on the ground."]
            }]
        }]
    }, {
        "name": ["flat_field_algorithm"],
        "version_id": ["1.0"],
        "local_identifier": ["flat_field_algorithm"],
        "nillable_flag": ["false"],
        "submitter_name": ["Cristina De Cesare"],
        "definition": ["The flat_field_algorithm specifies the algorithm used to remove the flat field signature."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["radiometric_correction_type_name"],
        "version_id": ["1.0"],
        "local_identifier": ["radiometric_correction_type_name"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The radiometric_correction_type_name identifies the method used for radiometric\n      correction."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["exposure_duration_threshold_count"],
        "version_id": ["1.0"],
        "local_identifier": ["exposure_duration_threshold_count"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The exposure_duration_threshold specifies the exposure time threshold in raw counts, when shutter_subtraction_mode = 'Conditional'."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["shutter_subtraction_mode"],
        "version_id": ["1.0"],
        "local_identifier": ["shutter_subtraction_mode"],
        "nillable_flag": ["false"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The shutter_subtraction_mode specifies whether shutter subtraction will be performed, or if it is dependent on the\n      exposure_duration_threshold_count."],
        "DD_Value_Domain": [{
            "enumeration_flag": ["true"],
            "value_data_type": ["ASCII_Short_String_Collapsed"],
            "unit_of_measure_type": ["Units_of_None"],
            "DD_Permissible_Value": [{
                "value": ["True"],
                "value_meaning": ["shutter subtraction will be performed"]
            }, {
                "value": ["Conditional"],
                "value_meaning": ["the exposure_duration_threshold_count will determine whether or not shutter subtraction will be performed"]
            }]
        }]
    }, {
        "name": ["sequence_number"],
        "version_id": ["1.0"],
        "local_identifier": ["sequence_number"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The sequence_number attribute supplies the sequence \n      identifier for the associated value in a group of related values. \n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"]
        }]
    }, {
        "name": ["id"],
        "version_id": ["1.0"],
        "local_identifier": ["id"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The id attribute supplies a short name (identifier) \n      for the associated value in a group of related values. \n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Short_String_Collapsed"]
        }]
    }, {
        "name": ["value_number"],
        "version_id": ["1.0"],
        "local_identifier": ["value_number"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The value_number attribute provides the value with \n      no applicable units as named by the associated id, name, or sequence_number. \n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    }, {
        "name": ["value_string"],
        "version_id": ["1.0"],
        "local_identifier": ["value_string"],
        "nillable_flag": ["false"],
        "submitter_name": ["Elizabeth Rye"],
        "definition": ["The value_string attribute provides the value with \n      no applicable units as named by the associated id, name, or sequence_number. \n    "],
        "DD_Value_Domain": [{
            "enumeration_flag": ["false"],
            "value_data_type": ["ASCII_Real"],
            "unit_of_measure_type": ["Units_of_None"]
        }]
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // CLASSES START
    
    {
        "name": ["Command_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Command_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The Command_Parameters class contains attributes used to identify or describe the\n      commands sent to a spacecraft to perform one or more actions resulting in the acquisition of\n      the current data product."],
        "DD_Association": [{
            "local_identifier": ["pds.description"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["detector_erase_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Exposure_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Data_Correction_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Autoexposure_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Autoexposure_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Autoexposure_Parameters class contains attributes used to identify or describe the histogram\n    thresholding algorithm and applicable attributes required for those algorithms. The input parameters for the algorithm can be specified \n    using the Algorithm_Parameter class or via a Local_Internal_Reference to a mission-specific parameter definition."],
        "DD_Association": [{
            "local_identifier": ["autoexposure_algorithm_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Algorithm_Parameter"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["pds.Local_Internal_Reference"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Algorithm_Parameter"],
        "version_id": ["1.0"],
        "local_identifier": ["Algorithm_Parameter"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Algorithm_Parameter class provides a name and value(s) use for input into the autoexposure algorithm."],
        "DD_Association": [{
            "local_identifier": ["pds.name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["pds.value"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Data_Correction_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Data_Correction_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The Data_Correction_Parameters class describes data processing steps applied to\n      data, either on-board a spacecraft or after receipt of the data on the ground, to remove\n      artifacts introduced into the data by the instrument. As a child of the Command_Parameters class, these attribute values\n      are those that were commanded to the spacecraft."],
        "DD_Association": [{
            "local_identifier": ["Data_Correction"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Data_Correction"],
        "version_id": ["1.0"],
        "local_identifier": ["Data_Correction"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Data_Correction class specifies describes details regarding\n      the calibration and/or processing performed on the data product. This class can be used to describe various \n      data corrections, such as antiblooming, bad pixel replacement, blemish protection, dark current correction, or\n      shutter correction. This can be specified multiple times in order to detail numerous corrections, and should be used\n      to designate PDS3-like flag attributes, such as dark_current_correction_flag and flat_field_correction_flag.\n    "],
        "DD_Association": [{
            "local_identifier": ["active_flag"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["data_correction_type"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["data_correction_venue"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Data_Correction_File"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Flat_Field_Correction_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Radiometric_Correction_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Shutter_Subtraction_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Data_Correction_File"],
        "version_id": ["1.0"],
        "local_identifier": ["Data_Correction_File"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Data_Correction_File class specifies a file containing explicit details regarding\n      the calibration and/or processing performed on the data product. The enclosing class and surrounding\n      attribute provide the necessary context to interpret this file. As a subclass of the\n      Data_Correction_Parameters class, this specifies calibration applied to the science data as\n      opposed to calibration the instrument before launch. As a subclass of the\n      Derived_Product_Parameters class, this specifies a file describing the post processing of the\n      product after radiometric and photometric calibrations."],
        "DD_Association": [{
            "local_identifier": ["pds.description"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["XSChoice#", "pds.Internal_Reference", "pds.External_Reference"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Correction_Parameter"],
        "version_id": ["1.0"],
        "local_identifier": ["Correction_Parameter"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Correction_Parameter class specifies identifier(s) and value for a data correction parameter applicable to the parent class."],
        "DD_Association": [{
            "local_identifier": ["List_Index_No_Units_Imaging"],
            "reference_type": ["parent_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Shutter_Subtraction_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Shutter_Subtraction_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Shutter_Subtraction_Parameters class specifies attributes describing the removal from the image of the shutter, or fixed-pattern."],
        "DD_Association": [{
            "local_identifier": ["shutter_subtraction_mode"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["exposure_duration_threshold_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Flat_Field_Correction_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Flat_Field_Correction_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Flat_Field_Correction_Parameters class specifies the onboard flat-field coefficients/parameters used in the algorithm to remove the flat field signature."],
        "DD_Association": [{
            "local_identifier": ["flat_field_algorithm"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["Correction_Parameter"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Radiometric_Correction_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Radiometric_Correction_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Radiometric_Correction_Parameters class is a container for the type and details\n      of the radiometric calibration performed on the product. "],
        "DD_Association": [{
            "local_identifier": ["radiometric_correction_type_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Sampling_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Sampling_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Sampling_Parameters class contains attributes and classes related to the sampling, scaling, companding, and \n      compression or reduction in resolution of data."],
        "DD_Association": [{
            "local_identifier": ["crosstrack_summing"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["downtrack_summing"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["sample_bits"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["sample_bit_mask"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["sampling_factor"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Companding_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Pixel_Averaging_Dimensions"],
        "version_id": ["1.0"],
        "local_identifier": ["Pixel_Averaging_Dimensions"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Pixel_Averaging class provides the height and width, in pixels, of\n      the area over which pixels were averaged prior to image compression."],
        "DD_Association": [{
            "local_identifier": ["height_pixels"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["width_pixels"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Companding_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Companding_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Companding_Parameters class describes whether or not data is or has had its bit\n      depth reduced (for example conversion from 12 to 8 bits via a lookup\n      table or bit scaling), the venue where it occurred (Software or Hardware),\n      and the method used to complete the companding."],
        "DD_Association": [{
            "local_identifier": ["companding_state"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["companding_venue"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["companding_method"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Frame_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Frame_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Frame_Parameters class contains attributes providing information specific to \n      an image frame. A frame consists of a sequence of measurements made over a specified time interval, and may include measurements from different \n      instrument modes."],
        "DD_Association": [{
            "local_identifier": ["frame_id"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["frame_type_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["interframe_delay"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Subframe_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Subframe_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The Subframe_Parameters class describes the position and other optional\n      characteristics of an image subframe, relative to the original image. "],
        "DD_Association": [{
            "local_identifier": ["first_line"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["first_sample"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["lines"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["samples"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["pds.name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["pds.description"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["subframe_type"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Downsampling_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Downsampling_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The Downsampling_Parameters class describes whether or not downsampling occurred, the venue where \n      it occurrected (Software or Hardware), the method used to downsample, and the pixel averaging dimensions.\n      A downsampled image is a smaller version of the image, resulting in reduced resolution of the\n      same coverage area"],
        "DD_Association": [{
            "local_identifier": ["downsampling_flag"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["downsampling_venue"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["downsampling_method"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Pixel_Averaging_Dimensions"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Exposure_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Exposure_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Exposure_Parameters class contains attributes identifying the image instrument\n      exposure configuration and image exposure values. As a child of the Image_Product_Information class, these attribute values\n      identify the actual exposure values when the image was taken. As a child of the Command_Parameters class, these attribute values\n      are those that were commanded to the spacecraft at the time the image was taken."],
        "DD_Association": [{
            "local_identifier": ["exposure_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["exposure_duration"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["exposure_duration_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["exposure_type"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Packet_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Packet_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The Packet_Parameters class contains parameters describing the packetized telemetry\n      data."],
        "DD_Association": [{
            "local_identifier": ["creation_sclk"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["creation_date_time"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["expected_packets"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["received_packets"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["missing_packet_flag"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["packet_map_mask"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Instrument_Device_Temperature"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Temperature"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Instrument_Device_Temperature class provides a container for the set of\n      temperatures of some point on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["Instrument_Device_Temperature_Index"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Instrument_Device_Temperature_Index"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Temperature_Index"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The Instrument_Device_Temperature_Index class provides the temperature of some point\n      on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["device_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["XSChoice#", "raw_count", "temperature_value"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["2"]
        }]
    }, {
        "name": ["Instrument_Device_Voltage"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Voltage"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Instrument_Device_Voltage class provides a container for the set of\n      voltages of some point on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["Instrument_Device_Voltage_Index"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Instrument_Device_Voltage_Index"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Voltage_Index"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Instrument_Device_Voltage_Index class provides the voltage of some point\n      on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["device_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["voltage_value"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Instrument_Device_Current"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Current"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Instrument_Device_Current class provides a container for the set of\n      current of some point on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["Instrument_Device_Current_Index"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Instrument_Device_Current_Index"],
        "version_id": ["1.0"],
        "local_identifier": ["Instrument_Device_Current_Index"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Instrument_Device_Current_Index class provides the current of some point\n      on an instrument or other device."],
        "DD_Association": [{
            "local_identifier": ["device_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["current_value"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Filter"],
        "version_id": ["1.0"],
        "local_identifier": ["Filter"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The Filter class describes the filter associated with a particular observation. The\n      filter may be identified by name, identifier, number or some combination of\n      these."],
        "DD_Association": [{
            "local_identifier": ["filter_name"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["filter_id"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["filter_number"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["bandwidth"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["center_filter_wavelength"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["pds.comment"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Bayer_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Bayer_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Bayer_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Bayer_Parameters class describes whether or not an image is bayer encoded, and how\n    the Bayer pattern was removed."],
        "DD_Association": [{
            "local_identifier": ["bayer_state"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["debayer_venue"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["debayer_algorithm"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Image_Compression_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Image_Compression_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The Image_Compression_Parameters class contains attributes describing onboard\n      compression parameters used for data storage and transmission."],
        "DD_Association": [{
            "local_identifier": ["compression_class"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["compression_mode"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["compression_type"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["compression_rate"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["compression_ratio"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["compression_quality"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["deferred_flag"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["error_pixel_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["XSChoice#", "ICER_Parameters", "LOCO_Parameters", "JPEG_Parameters", "JPEG_Progressive_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["JPEG_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["JPEG_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The JPEG_Parameters class contains attributes describing onboard\n      compression parameters specific to Joint Photographic Experts Group (JPEG) image compression."],
        "DD_Association": [{
            "local_identifier": ["color_subsampling_mode"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["jpeg_quality"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["jpeg_parameter"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["JPEG_Progressive_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["JPEG_Progressive_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The JPEG_Progressive_Parameters class contains attributes describing an interlaced progressive JPEG format, \n      in which data is compressed in multiple passes of progressively higher detail. This is ideal for large images that will \n      be displayed while downloading over a slow connection, allowing a reasonable preview after receiving only a portion of the data."],
        "DD_Association": [{
            "local_identifier": ["JPEG_Parameters"],
            "reference_type": ["parent_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["progressive_stage"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["LOCO_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["LOCO_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The LOCO_Parameters class contains attributes describing onboard\n      compression parameters specific to Low Complexity Lossless Compression (LOCO) image compression, a lossless submode of ICER"],
        "DD_Association": [{
            "local_identifier": ["wavelet_filter"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["missing_pixel_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["ICER_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["ICER_Parameters"],
        "submitter_name": ["Jordan Padams"],
        "definition": [" The ICER_Parameters class contains attributes describing onboard\n      compression parameters specific to Joint Photographic Experts Group (JPEG) image compression. ICER is a wavelet-based image compression file format used by the NASA Mars Rovers. ICER has both lossy and lossless compression modes."],
        "DD_Association": [{
            "local_identifier": ["wavelet_filter"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["icer_quality"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["decomposition_stages"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["segment_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Image_Compression_Segment"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["Image_Compression_Segment"],
        "version_id": ["1.0"],
        "local_identifier": ["Image_Compression_Segment"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": [" The Image_Compression_Segment class provides attributes describing each segment into which data was\n      partitioned for error containment purposes as part of the compression process. "],
        "DD_Association": [{
            "local_identifier": ["segment_number"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["first_line"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["first_sample"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["lines"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["samples"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["segment_quality"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["segment_status"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["missing_pixel_count"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Imaging_Instrument_State_Parameters"],
        "version_id": ["1.0"],
        "local_identifier": ["Imaging_Instrument_State_Parameters"],
        "submitter_name": ["Elizabeth D. Rye"],
        "definition": ["The Imaging_Instrument_State_Parameters class contains attributes providing the values of\n      any dynamic physical or operating characteristics of the imaging instrument."],
        "DD_Association": [{
            "local_identifier": ["analog_offset"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["azimuth_fov"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["elevation_fov"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["detector_first_line"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["detector_first_sample"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["detector_lines"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["detector_to_image_rotation"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["gain_mode_id"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["gain_number"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Instrument_Device_Current"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Instrument_Device_Temperature"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Instrument_Device_Voltage"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Image_Product_Information"],
        "version_id": ["1.0"],
        "local_identifier": ["Image_Product_Information"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Image_Product_Information class contains classes and attributes that describe the image product itself,\n      including information about the exposure duration, filters, data correction, sampling, frame, sub-frames, and \n      how the product was derived."],
        "DD_Association": [{
            "local_identifier": ["Autoexposure_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Exposure_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Data_Correction_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Filter"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["Sampling_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Downsampling_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Frame_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Subframe_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }]
    }, {
        "name": ["Imaging"],
        "version_id": ["1.0"],
        "local_identifier": ["Imaging"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["The Imaging class contains classes and attributes describing both the \n      image product itself and the imaging instrument. Image product information can include exposure duration, \n      filters, data correction, sampling, frame, sub-frames, and how the product was derived. \n      For the imaging instrument, information can be provided describing the dynamic physical or operating \n      characteristics of the imaging instrument."],
        "element_flag": ["true"],
        "DD_Association": [{
            "local_identifier": ["pds.Local_Internal_Reference"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["Command_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["1"]
        }, {
            "local_identifier": ["Image_Product_Information"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["Imaging_Instrument_State_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }, {
            "local_identifier": ["Image_Compression_Parameters"],
            "reference_type": ["component_of"],
            "minimum_occurrences": ["0"],
            "maximum_occurrences": ["*"]
        }]
    }, {
        "name": ["List_Index_No_Units_Imaging"],
        "version_id": ["1.0"],
        "local_identifier": ["List_Index_No_Units_Imaging"],
        "submitter_name": ["Jordan Padams"],
        "definition": ["Used when the list values have no units.\n    "],
        "abstract_flag": ["true"],
        "DD_Association": [{
            "local_identifier": ["XSChoice#", "sequence_number", "pds.name", "id"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["3"]
        }, {
            "local_identifier": ["XSChoice#", "value_number", "value_string"],
            "reference_type": ["attribute_of"],
            "minimum_occurrences": ["1"],
            "maximum_occurrences": ["1"]
        }]
    }
]