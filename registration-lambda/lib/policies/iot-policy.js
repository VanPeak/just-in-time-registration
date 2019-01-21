/**
 * The policy object for Greengrass to provision.
 */
module.exports = () => ({
  'Version': '2012-10-17',
  'Statement': [

    /**
     * Authorize IoT devices to connect to the AWS IoT
     * broker using its client identifier.
     */
    {
      'Effect': 'Allow',
      'Action': [
        'iot:Connect'
      ],
      'Resource': [],
      'Condition': {
        'StringLike': {
          'iot:Certificate.Subject.Title': 'iot'
        }
      }
    },

    /**
     * Authorize IoT devices to subscribe to AWS IoT.
     */
    {
      'Effect': 'Allow',
      'Action': [
        'iot:Subscribe'
      ],
      'Resource': [
        `arn:aws:iot:${process.env.AWS_REGION}:${process.env.AccountId}:topic/$aws/things/` + '${iot:Connection.Thing.ThingName}/shadow/*'
      ],
      'Condition': {
        'StringLike': {
          'iot:Certificate.Subject.Title': 'iot'
        }
      }
    },

    /**
     * Authorize IoT devices to receive messages from AWS IoT.
     */
    {
      'Effect': 'Allow',
      'Action': [
        'iot:Receive'
      ],
      'Resource': [
        `arn:aws:iot:${process.env.AWS_REGION}:${process.env.AccountId}:topic/$aws/things/` + '${iot:Connection.Thing.ThingName}/shadow/*'
      ],
      'Condition': {
        'StringLike': {
          'iot:Certificate.Subject.Title': 'iot'
        }
      }
    },

    /**
     * Authorize IoT devices to publish messages to AWS IoT.
     */
    {
      'Effect': 'Allow',
      'Action': [
        'iot:Publish'
      ],
      'Resource': [
        `arn:aws:iot:${process.env.AWS_REGION}:${process.env.AccountId}:topic/$aws/things/` + '${iot:Connection.Thing.ThingName}/shadow/*'
      ],
      'Condition': {
        'StringLike': {
          'iot:Certificate.Subject.Title': 'iot'
        }
      }
    },

    /**
     * Authorize the thing to retrieve and update its associated
     * thing shadow document.
     */
    {
      'Effect': 'Allow',
      'Action': [
        'iot:UpdateThingShadow',
        'iot:GetThingShadow',
        'iot:DeleteThingShadow'
      ],
      'Resource': [
        `arn:aws:iot:${process.env.AWS_REGION}:${process.env.AccountId}:topic/$aws/things/` + '${iot:Connection.Thing.ThingName}/shadow/*'
      ]
    }
  ]
});