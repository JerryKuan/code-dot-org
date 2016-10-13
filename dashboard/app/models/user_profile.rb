# == Schema Information
#
# Table name: user_profiles
#
#  id             :integer          not null, primary key
#  user_id        :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  updated_by     :integer
#  other_user_ids :string(255)
#  other_emails   :string(255)
#  course         :string(255)
#  pd             :string(255)
#  pd_manual      :string(255)
#  properties     :text(65535)
#
# Indexes
#
#  index_user_profiles_on_user_id  (user_id)
#

class UserProfile < ActiveRecord::Base
  belongs_to :user

  include SerializedProperties
  serialized_attrs %w(facilitator nmsi teals)

  YEARS = [
    YEAR_NONE = 'none'.freeze,
    YEAR_2013_2014 = '2013-2014'.freeze,
    YEAR_2014_2015 = '2014-2015'.freeze,
    YEAR_2015_2016 = '2015-2016'.freeze,
    YEAR_2016_2017 = '2016-2017'.freeze,
  ].freeze
  validates_inclusion_of :pd, in: YEARS, allow_nil: true
  validates_inclusion_of :pd_manual, in: YEARS, allow_nil: true

  COURSES = [
    CSD = 'csd'.freeze,
    CSF = 'csf'.freeze,
    CSP = 'csp'.freeze,
    ECS = 'ecs'.freeze
  ].freeze
  # TODO(asher): Change the DB to enforce course to be non-null. Add a unique
  #   index on (user_id, course).
  validates_inclusion_of :course, in: COURSES

  # The field other_user_ids is a comma-separated list of alternate Code Studio
  # IDs for the user.

  # @returns [Array[Integer]] an array of alternate user IDs for the user.
  def get_other_user_ids
    return [] if other_user_ids.nil?
    other_user_ids.split(',').map(&:to_i)
  end

  # @param alternate_user_id [Integer] an alternate user_id for the user.
  # TODO(asher): Determine whether we should validate the existence of an
  #   account with user_id of alternate_user_id.
  def add_other_user_id(alternate_user_id)
    existing_other_user_ids = get_other_user_ids
    return if existing_other_user_ids.include? alternate_user_id
    self.other_user_ids = (existing_other_user_ids << alternate_user_id).join(',')
    self.save!
  end

  # The field other_emails is a comma-separated list of alternate email
  # addresses for the user.

  # @returns [Array[String]] an array of email addresses.
  def get_other_emails
    return [] if other_emails.nil?
    other_emails.split(',')
  end

  # @param email [String] an alternate email address for the user.
  def add_other_email(email)
    existing_other_emails = get_other_emails
    return if existing_other_emails.include? email
    self.other_emails = (existing_other_emails << email).join(',')
    self.save!
  end

  # Returns whether the user has been PDed in course, taking into account a
  # manual answer if present.
  # @return [String | nil] the academic year the user was PDed (if PDed) or nil
  #   (if not PDed)
  def get_pd
    return pd unless pd_manual
    return nil if pd_manual == YEAR_NONE
    return pd_manual
  end
end
